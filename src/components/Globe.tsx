import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
  size?: number;
}

const Globe: React.FC<GlobeProps> = ({ size = 260 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const phi = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fall back to the `size` prop so the globe is never initialized with a
    // zero width if offsetWidth hasn't settled yet on first paint.
    let width = canvas.offsetWidth || size;

    const resizeObserver = new ResizeObserver((entries) => {
      const observedWidth = entries[0]?.contentRect.width;
      if (observedWidth) width = observedWidth;
    });
    resizeObserver.observe(canvas);

    let globe: ReturnType<typeof createGlobe> | null = null;
    let frameId = 0;
    let timer = 0;
    let inView = false;

    const stopLoop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const startLoop = () => {
      if (frameId || !globe) return;
      const tick = () => {
        if (pointerInteracting.current === null) {
          phi.current += 0.003;
        }
        globe?.update({
          phi: phi.current + pointerMovement.current,
          width: width * 2,
          height: width * 2,
        });
        frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
    };

    // Only pay for WebGL init + the render loop once the globe is actually
    // visible — most placements sit well below the fold, so this avoids
    // burning GPU/CPU on a globe nobody is looking at yet, and pauses again
    // once it's scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          stopLoop();
          return;
        }
        if (globe) {
          startLoop();
          return;
        }
        // Deferred to a macrotask so React 18 StrictMode's dev-only
        // double-mount (mount -> cleanup -> mount, all synchronous) never
        // actually creates two globes on the same canvas: the phantom first
        // mount's cleanup clears this timeout before it fires, so
        // createGlobe only ever runs once per real mount. Calling
        // createGlobe twice on one canvas hits the same underlying WebGL
        // context both times (a canvas only ever hands out one), which
        // threw "no buffer is bound to enabled attribute" and left the
        // canvas permanently blank — this sidesteps that entirely.
        timer = window.setTimeout(() => {
          globe = createGlobe(canvas, {
            devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            // Lower than cobe's demo default (16000) — still reads as a
            // dense dot-map at the sizes this renders at (150-230px), for
            // roughly a third of the per-frame point cost.
            mapSamples: 6000,
            mapBrightness: 6,
            baseColor: [0.13, 0.22, 0.38],
            markerColor: [0.38, 0.65, 1],
            glowColor: [0.15, 0.3, 0.55],
            markers: [
              { location: [23.0225, 72.5714], size: 0.07 }, // Ahmedabad — SAC, ISRO
              { location: [18.5204, 73.8567], size: 0.05 }, // Pune — VIT
            ],
          });
          // cobe 2.x has no `onRender` callback (that's a 3.x-only API) — it
          // draws once on creation and otherwise only redraws when
          // `.update()` is called, so the auto-rotation loop has to be
          // driven ourselves.
          if (inView) startLoop();
        }, 0);
      },
      { rootMargin: '200px' }
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      stopLoop();
      globe?.destroy();
      resizeObserver.disconnect();
    };
  }, [size]);

  return (
    <div
      style={{ width: size, height: size, maxWidth: '100%', aspectRatio: 1 }}
      className="relative mx-auto"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = (e.clientX - pointerInteracting.current) * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            pointerMovement.current = (e.touches[0].clientX - pointerInteracting.current) * 0.005;
          }
        }}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
      />
    </div>
  );
};

export default Globe;
