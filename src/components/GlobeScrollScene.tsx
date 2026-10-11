import React, { useEffect, useRef } from 'react';
import { animate, type JSAnimation } from 'animejs';
import { Satellite, RadioTower, Crosshair } from 'lucide-react';
import Globe from './Globe';

interface Figure {
  label: string;
  Icon: typeof Satellite;
  angleDeg: number; // static position around the globe
  radius: number;
  fromZ: number; // where it drifts in from as you scroll
  toZ: number; // resting depth
}

const FIGURES: Figure[] = [
  { label: 'Satellite Link', Icon: Satellite, angleDeg: -145, radius: 150, fromZ: -160, toZ: 70 },
  { label: 'Ground Antenna', Icon: RadioTower, angleDeg: 35, radius: 150, fromZ: -160, toZ: -30 },
  { label: 'Coverage Lock', Icon: Crosshair, angleDeg: 165, radius: 150, fromZ: -160, toZ: 20 },
];

// Scroll-driven 3D scene: the globe + a small ring of figures tied to the
// antenna/coverage work it represents, tilting and drifting into depth as
// this section moves through the viewport.
//
// Driven by a plain `scroll` listener computing 0->1 progress from the
// section's own getBoundingClientRect(), fed into anime.js's `seek()` on
// animations created with autoplay:false — rather than anime's
// ScrollObserver (`onScroll`/`sync: true`). Switched to this after
// ScrollObserver produced no visible movement for a real user: it depends on
// anime's global engine tick, which (by design, via the library's own
// `pauseOnDocumentHidden` default) can stall in ways that are hard to
// diagnose from outside. A manual scroll handler + `seek()` has no such
// dependency — the progress math is plain, inspectable JS, and `seek()`
// renders synchronously the moment it's called.
const GlobeScrollScene: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const figureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (reduceMotion || !section || !scene) return;

    // Static placement around the globe — plain transform, never touched by
    // anime.js, so it can't fight with the scroll-driven animation below.
    figureRefs.current.forEach((el, i) => {
      if (!el) return;
      const rad = (FIGURES[i].angleDeg * Math.PI) / 180;
      const x = Math.cos(rad) * FIGURES[i].radius;
      const y = Math.sin(rad) * FIGURES[i].radius * 0.42;
      el.style.left = '50%';
      el.style.top = '50%';
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });

    const tiltAnim = animate(scene, {
      rotateY: [-20, 20],
      rotateX: [10, -8],
      ease: 'linear',
      autoplay: false,
    });

    const figureAnims = figureRefs.current
      .map((el, i) => {
        const inner = el?.firstElementChild as HTMLElement | null;
        if (!inner) return null;
        const f = FIGURES[i];
        return animate(inner, {
          translateZ: [f.fromZ, f.toZ],
          opacity: [0, 1],
          scale: [0.6, 1],
          ease: 'linear',
          autoplay: false,
        });
      })
      .filter((a): a is JSAnimation => a !== null);

    const allAnims = [tiltAnim, ...figureAnims];

    // Called directly from the scroll/resize listeners below, not through
    // requestAnimationFrame — a rAF-throttled version of this was tried
    // first and quietly never ran in some tab states (rAF callbacks can be
    // suspended independently of scroll events firing), which is exactly
    // the kind of silent failure this needs to not have. `scroll` events
    // are cheap to handle directly here; there's no real cost to skipping
    // the throttle.
    const render = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top has just entered the bottom of the
      // viewport, 1 when its bottom has fully exited the top — i.e. the
      // animation plays out across the section's entire pass through view.
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, total > 0 ? traveled / total : 0));
      allAnims.forEach((a) => a.seek(progress * a.duration));
    };

    const onScroll = () => render();

    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      allAnims.forEach((a) => a.revert());
    };
  }, []);

  return (
    // Tall on purpose: progress above maps to how far this whole block has
    // passed through the viewport, so a short block gave it only a couple
    // hundred px of scroll to complete in and it blew past unnoticed.
    // ~1.4 screens of scroll distance is what makes it a felt animation.
    <div ref={sectionRef} className="relative min-h-[140vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          ref={sceneRef}
          style={{ perspective: '1200px' }}
          className="relative mx-auto flex items-center justify-center"
        >
          <div style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
            <Globe size={230} />
            {FIGURES.map((f, i) => (
              <div
                key={f.label}
                ref={(el) => (figureRefs.current[i] = el)}
                className="absolute pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="flex flex-col items-center gap-1.5"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-11 h-11 rounded-full border border-blue-400/50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.25)]">
                    <f.Icon size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                    {f.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-500 font-mono text-xs text-center max-w-sm">
          Ahmedabad (SAC · ISRO) — Pune (VIT) · antenna test-range &amp; positioning-system software
        </p>
      </div>
    </div>
  );
};

export default GlobeScrollScene;
