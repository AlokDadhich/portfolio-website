import React, { useEffect } from 'react';

// Adds scroll-linked depth to the existing star field rather than replacing
// it: the three `.stars-*` layers already in App.tsx keep their own
// automatic drift + twinkle animation exactly as before, but each now also
// drifts at its own rate as the page scrolls — near/far depth cue, which is
// the actual "moving through an environment" feeling a static background
// can't give. Wired through a `--parallax-y` CSS variable that index.css's
// `animStar` keyframe already reads, so this never touches the existing
// animation directly.
const LAYERS: { selector: string; factor: number }[] = [
  { selector: '.stars-small', factor: 0.02 },
  { selector: '.stars-medium', factor: 0.05 },
  { selector: '.stars-big', factor: 0.09 },
];

const StarfieldParallax: React.FC = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const layers = LAYERS.map((l) => ({
      el: document.querySelector<HTMLElement>(l.selector),
      factor: l.factor,
    }));

    const onScroll = () => {
      const y = window.scrollY;
      for (const { el, factor } of layers) {
        el?.style.setProperty('--parallax-y', `${-y * factor}px`);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
};

export default StarfieldParallax;
