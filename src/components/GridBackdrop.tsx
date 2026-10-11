import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InteractiveGrid from './InteractiveGrid';

// Same phase timing as App.tsx's AnimatedRoutes — kept in sync deliberately
// so the real background grid zooms out/in exactly alongside the real page
// text. Plain CSS transitions, not motion's useAnimation() (its start()
// promise never resolves with this project's exact dependency versions).
const EXIT_MS = 400;
const ENTER_DELAY_MS = 450;
const ENTER_MS = 750;
const BASE_OPACITY = 0.3;

type Phase = 'idle' | 'exiting' | 'entering';

const phaseStyle = (phase: Phase): React.CSSProperties => {
  if (phase === 'exiting') {
    return {
      transform: 'scale(1.35)',
      opacity: 0.08,
      transitionProperty: 'transform, opacity',
      transitionDuration: `${EXIT_MS}ms`,
      transitionTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
      willChange: 'transform, opacity',
    };
  }
  if (phase === 'entering') {
    return {
      transform: 'scale(1)',
      opacity: BASE_OPACITY,
      transitionProperty: 'transform, opacity',
      transitionDuration: `${ENTER_MS}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${ENTER_DELAY_MS}ms`,
      willChange: 'transform, opacity',
    };
  }
  return { transform: 'scale(1)', opacity: BASE_OPACITY };
};

const GridBackdrop: React.FC = () => {
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>('idle');
  const isFirstRender = useRef(true);
  const displayedPath = useRef(location.pathname);

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (displayedPath.current === location.pathname) return;
    displayedPath.current = location.pathname;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (shouldReduceMotion) return;

    setPhase('exiting');
    const swapTimer = setTimeout(() => setPhase('entering'), EXIT_MS);
    const settleTimer = setTimeout(() => setPhase('idle'), EXIT_MS + ENTER_DELAY_MS + ENTER_MS);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(settleTimer);
    };
  }, [location.pathname]);

  return (
    <div
      className="fixed inset-0 hidden lg:block pointer-events-none"
      style={{ zIndex: 2, ...phaseStyle(phase) }}
    >
      <InteractiveGrid columns={30} rows={17} radius={190} maxAngle={24} className="w-full h-full" />
    </div>
  );
};

export default GridBackdrop;
