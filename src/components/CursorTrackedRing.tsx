import React, { useCallback, useEffect, useRef } from 'react';
import { animate } from 'motion/react';

interface CursorTrackedRingProps {
  className?: string;
}

// The specular ring on the outer card shell (Hero.tsx) — same angle math as
// GlowingEffect's own cursor tracking, kept as a separate component instead
// of reading GlowingEffect's `--start` directly, since that's set on a
// sibling element and CSS custom properties don't cross siblings without a
// shared ancestor writing them. Renders a masked 1px ring whose brightest
// point follows the cursor's angle from the card's center and fades toward
// the opposite side, rather than a fixed-direction gradient.
//
// The angle is eased with the exact same duration/easing GlowingEffect uses
// for its own `--start` (movementDuration 1.5s, ease [0.16, 1, 0.3, 1]) —
// setting this instantly per-frame made the ring visibly lead the glow
// while the cursor was moving (the glow eases, the ring snapped), so the
// two looked like separate light sources instead of one.
const CursorTrackedRing: React.FC<CursorTrackedRingProps> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  const handleMove = useCallback((e?: PointerEvent) => {
    const element = ref.current;
    if (!element) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el || !e) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const center = [left + width * 0.5, top + height * 0.5];
      const targetAngle = (180 * Math.atan2(e.clientY - center[1], e.clientX - center[0])) / Math.PI + 90;

      const currentAngle = parseFloat(el.style.getPropertyValue('--ring-angle')) || 0;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      animate(currentAngle, newAngle, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value: number) => {
          el.style.setProperty('--ring-angle', `${value}deg`);
        },
      });
    });
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => handleMove(e);
    document.body.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      document.body.removeEventListener('pointermove', onMove);
    };
  }, [handleMove]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute -inset-[3px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${className}`}
      style={
        {
          padding: 1,
          '--ring-angle': '135deg',
          background:
            'conic-gradient(from var(--ring-angle), rgba(255,255,255,0.34) 0deg, rgba(255,255,255,0.12) 90deg, rgba(255,255,255,0.085) 180deg, rgba(255,255,255,0.12) 270deg, rgba(255,255,255,0.34) 360deg)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
    />
  );
};

export default CursorTrackedRing;
