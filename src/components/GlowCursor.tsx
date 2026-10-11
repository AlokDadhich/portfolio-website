import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

// Theme-matched: bright blue-200 head fading to a deeper blue-600 tail.
const HEAD_COLOR = { r: 191, g: 219, b: 254 };
const TAIL_COLOR = { r: 37, g: 99, b: 235 };

const TRAIL_LENGTH = 14; // shorter, more restrained tail
const FOLLOW_SPEED = 0.22; // shared by dot, ring, and the trail head — keeps all three moving as one unit
const IDLE_TIMEOUT = 700;
const FADE_DURATION = 900;

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, .cursor-hover';

const GlowCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || isCoarse) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !ctx || !dot || !ring) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const trail: Point[] = [];
    const head = { x: -200, y: -200 };
    let target: Point | null = null;
    let lastMove = performance.now();
    let isActive = false;

    const handleMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      lastMove = performance.now();
      isActive = true;
    };
    const handleLeave = () => {
      isActive = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.backgroundColor = 'rgba(96,165,250,0.12)';
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTOR)) {
        ring.style.width = '28px';
        ring.style.height = '28px';
        ring.style.backgroundColor = 'rgba(96,165,250,0)';
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    const tick = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (target) {
        head.x += (target.x - head.x) * FOLLOW_SPEED;
        head.y += (target.y - head.y) * FOLLOW_SPEED;
        trail.unshift({ x: head.x, y: head.y });
        if (trail.length > TRAIL_LENGTH) trail.pop();

        // Dot and ring both sit exactly on the trail's own head position —
        // same eased point driving all three, so nothing drifts ahead or behind.
        const transform = `translate(${head.x}px, ${head.y}px) translate(-50%, -50%)`;
        dot.style.transform = transform;
        dot.style.opacity = isActive ? '1' : '0';
        ring.style.transform = transform;
        ring.style.opacity = isActive ? '1' : '0';
      }

      const idleFor = now - lastMove;
      const idleAlpha = idleFor > IDLE_TIMEOUT
        ? Math.max(0, 1 - (idleFor - IDLE_TIMEOUT) / FADE_DURATION)
        : 1;

      // Drawn as a tapered fill polygon rather than a stroked line: a stroke
      // (even a single continuous one) always ends in a flat/round cap, so
      // the tail just stopped abruptly. Building the outline by hand — full
      // width at the head, narrowing to exactly zero at the last trail
      // point — makes both edges meet at a real point, giving a proper
      // comet-tip tail instead of a blunt end. Still one path/one fill per
      // pass, so there's no per-segment joint to bead.
      if (idleAlpha > 0.01 && trail.length > 2) {
        const n = trail.length;
        const outline = (maxWidth: number) => {
          const left: Point[] = [];
          const right: Point[] = [];
          for (let i = 0; i < n; i++) {
            const prev = trail[i - 1] || trail[i];
            const next = trail[i + 1] || trail[i];
            let dx = next.x - prev.x;
            let dy = next.y - prev.y;
            const len = Math.hypot(dx, dy) || 1;
            dx /= len;
            dy /= len;
            const perpX = -dy;
            const perpY = dx;
            const t = i / (n - 1);
            const half = (maxWidth * Math.pow(1 - t, 0.85)) / 2;
            left.push({ x: trail[i].x + perpX * half, y: trail[i].y + perpY * half });
            right.push({ x: trail[i].x - perpX * half, y: trail[i].y - perpY * half });
          }
          ctx.beginPath();
          ctx.moveTo(left[0].x, left[0].y);
          for (let i = 1; i < n; i++) ctx.lineTo(left[i].x, left[i].y);
          for (let i = n - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
          ctx.closePath();
        };

        // Pass 1: soft wide glow, single flat color, faded overall.
        outline(9);
        ctx.fillStyle = `rgba(${HEAD_COLOR.r}, ${HEAD_COLOR.g}, ${HEAD_COLOR.b}, ${0.3 * idleAlpha})`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 14;
        ctx.fill();

        // Pass 2: bright core. A head->tail gradient carries the color
        // shift and fade-to-transparent, on top of the polygon's own taper.
        const head0 = trail[0];
        const tail0 = trail[n - 1];
        const gradient = ctx.createLinearGradient(head0.x, head0.y, tail0.x, tail0.y);
        gradient.addColorStop(0, `rgba(${HEAD_COLOR.r}, ${HEAD_COLOR.g}, ${HEAD_COLOR.b}, ${0.95 * idleAlpha})`);
        gradient.addColorStop(1, `rgba(${TAIL_COLOR.r}, ${TAIL_COLOR.g}, ${TAIL_COLOR.b}, 0)`);

        outline(3.5);
        ctx.fillStyle = gradient;
        ctx.shadowColor = `rgba(${HEAD_COLOR.r}, ${HEAD_COLOR.g}, ${HEAD_COLOR.b}, ${0.5 * idleAlpha})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* No mix-blend-mode here deliberately: "screen" brightens whatever
          sits underneath, so background stars along the trail's path lit up
          as distinct hot dots instead of a clean line. Plain alpha + glow
          (shadowBlur) below reads as a glow without that side effect. */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[55] pointer-events-none hidden md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[60] w-1.5 h-1.5 rounded-full bg-blue-200 hidden md:block"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[60] w-7 h-7 rounded-full border border-blue-400/60 hidden md:block"
        style={{ opacity: 0, transition: 'width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, opacity 0.2s' }}
      />
    </>
  );
};

export default GlowCursor;
