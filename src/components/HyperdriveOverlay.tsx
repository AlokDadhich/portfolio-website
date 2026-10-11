import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

const DURATION = 1500; // ms — full lifecycle: dive in -> hyperdrive -> emerge
const MAX_DEPTH = 1000;

const HyperdriveOverlay: React.FC = () => {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const starCount = isCoarse ? 320 : 650;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const makeStar = (): Star => {
      const z = Math.random() * MAX_DEPTH + 1;
      return { x: (Math.random() - 0.5) * w * 1.6, y: (Math.random() - 0.5) * h * 1.6, z, pz: z };
    };
    starsRef.current = Array.from({ length: starCount }, makeStar);

    const cx = w / 2;
    const cy = h / 2;
    const focal = h * 0.85;
    const start = performance.now();

    // A frame paints before we flip opacity, so the CSS transition has
    // something to animate from — this is what gives the fade a smooth start.
    requestAnimationFrame(() => setVisible(true));

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // 0 -> 1 -> 0 envelope: dive in, hyperdrive punch, emerge.
      const envelope = Math.sin(Math.PI * progress);
      const speed = 2 + envelope * envelope * 42;

      // Translucent fill (rather than a hard clear) leaves motion trails.
      ctx.fillStyle = 'rgba(2, 8, 23, 0.38)';
      ctx.fillRect(0, 0, w, h);

      for (const star of starsRef.current) {
        star.pz = star.z;
        star.z -= speed;
        if (star.z <= 1) {
          const fresh = makeStar();
          fresh.z = MAX_DEPTH;
          fresh.pz = MAX_DEPTH;
          Object.assign(star, fresh);
          continue;
        }

        const sx = cx + (star.x / star.z) * focal;
        const sy = cy + (star.y / star.z) * focal;
        const px = cx + (star.x / star.pz) * focal;
        const py = cy + (star.y / star.pz) * focal;

        const depthFactor = 1 - star.z / MAX_DEPTH;
        const size = Math.max(0.5, depthFactor * 2.4);
        const alpha = Math.min(1, depthFactor * 1.3) * (0.35 + envelope * 0.65);

        ctx.strokeStyle = `rgba(199, 224, 255, ${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setVisible(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none transition-opacity ease-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: visible ? '300ms' : '550ms' }}
    />
  );
};

export default HyperdriveOverlay;
