import React, { memo, useCallback, useEffect, useRef } from 'react';
import { animate } from 'motion/react';

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

// Adapted from Aceternity UI's Glowing Effect
// (https://ui.aceternity.com/components/glowing-effect) — a border glow that
// tracks the cursor around a card's edge via a conic-gradient mask, rather
// than lighting up the whole card. Re-themed from the original's rainbow
// gradient to a single-hue blue sweep to match this site's palette, and
// tuned down (lower opacity ceiling, tighter spread) per "subtle." Uses the
// `motion` package already installed — no new dependency.
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.6,
    proximity = 64,
    spread = 30,
    glow = false,
    className = '',
    movementDuration = 1.5,
    borderWidth = 1,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: PointerEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty('--active', '0');
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty('--active', isActive ? '1' : '0');
          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value: number) => {
              element.style.setProperty('--start', String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener('scroll', handleScroll, { passive: true });
      document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener('scroll', handleScroll);
        document.body.removeEventListener('pointermove', handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            '--blur': `${blur}px`,
            '--spread': spread,
            '--start': '0',
            '--active': '0',
            '--glowingeffect-border-width': `${borderWidth}px`,
            // Plain white sweep — matches Aceternity's own "white" variant
            // (a single flat color rather than a rainbow), which reads as a
            // crisp bright line against a near-black card instead of a
            // colored haze. The arc-limited reveal comes from the mask
            // below, not from this gradient itself, so one solid color here
            // is enough.
            '--gradient': `repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #ffffff 0%,
                #ffffff calc(100% / var(--repeating-conic-gradient-times))
              )`,
            '--repeating-conic-gradient-times': '5',
          } as React.CSSProperties
        }
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity',
          glow && 'opacity-100',
          blur > 0 && 'blur-[var(--blur)]',
          className
        )}
      >
        <div
          className={cn(
            'rounded-[inherit]',
            'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
            'after:[border:var(--glowingeffect-border-width)_solid_transparent]',
            'after:[background:var(--gradient)] after:[background-attachment:fixed]',
            'after:opacity-[var(--active)] after:transition-opacity after:duration-300',
            'after:[mask-clip:padding-box,border-box]',
            'after:[mask-composite:intersect]',
            'after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]'
          )}
        />
      </div>
    );
  }
);

GlowingEffect.displayName = 'GlowingEffect';

export default GlowingEffect;
