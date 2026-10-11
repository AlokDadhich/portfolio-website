import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import GlowCursor from './components/GlowCursor';
import HyperdriveOverlay from './components/HyperdriveOverlay';
import ScrollToTop from './components/ScrollToTop';
import GridBackdrop from './components/GridBackdrop';
import HeroSideLinks from './components/HeroSideLinks';

// Plain CSS transitions driven by a phase state machine — not motion's
// useAnimation()/AnimatePresence. Both were tried and got stuck: useAnimation's
// start() promise never resolves with this motion/react-router-dom version
// combo, and AnimatePresence's mode="wait" hangs the same way. CSS transitions
// are also compositor-accelerated, which is what actually fixes the jank.
const EXIT_MS = 400;
const ENTER_DELAY_MS = 450;
const ENTER_MS = 750;

type Phase = 'idle' | 'exiting' | 'entering';

const phaseStyle = (phase: Phase): React.CSSProperties => {
  if (phase === 'exiting') {
    return {
      transform: 'scale(1.35)',
      opacity: 0,
      transitionProperty: 'transform, opacity',
      transitionDuration: `${EXIT_MS}ms`,
      transitionTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
      transitionDelay: '0ms',
      willChange: 'transform, opacity',
    };
  }
  if (phase === 'entering') {
    return {
      transform: 'scale(1)',
      opacity: 1,
      transitionProperty: 'transform, opacity',
      transitionDuration: `${ENTER_MS}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${ENTER_DELAY_MS}ms`,
      willChange: 'transform, opacity',
    };
  }
  // `transform: scale(1)` is visually identical to no transform at all, but
  // CSS still treats *any* non-`none` transform value as establishing a new
  // stacking/backdrop-root context — which was silently blocking
  // `backdrop-filter` on anything inside this wrapper from ever reaching the
  // real page background (confirmed with a live test: it could only sample
  // other descendants of this same wrapper, never GridBackdrop/stars sitting
  // outside it as a sibling). `transform: 'none'` at idle removes that
  // boundary for the ~99% of time a page isn't mid-transition, with zero
  // visual difference from `scale(1)` — the animated exiting/entering phases
  // above are untouched, so the actual transition look/feel doesn't change.
  return { transform: 'none', opacity: 1 };
};

function AnimatedRoutes() {
  const location = useLocation();
  const element = useRoutes([
    { path: '/', element: <Hero /> },
    { path: '/about', element: <About /> },
    { path: '/experience', element: <Experience /> },
    { path: '/work', element: <Projects /> },
    { path: '/contact', element: <Contact /> },
  ]);

  const [displayed, setDisplayed] = useState(element);
  // Starts already zoomed/transparent so first load eases in too, in sync
  // with the hyperdrive overlay's own "warp in" on mount.
  const [phase, setPhase] = useState<Phase>('exiting');
  const displayedPath = useRef(location.pathname);
  const shouldReduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mount-only entrance animation. Empty deps deliberately: React only runs
  // this effect's cleanup on a true unmount (or once extra under StrictMode's
  // dev-only double-invoke), never on every render — unlike a cleanup tied to
  // [location.pathname], which would also fire on every real navigation and
  // stomp on state the nav effect below depends on. That's exactly the bug
  // that made every navigation after the first one silently do nothing.
  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase('idle');
      return;
    }
    const raf = requestAnimationFrame(() => setPhase('entering'));
    const settle = setTimeout(() => setPhase('idle'), ENTER_DELAY_MS + ENTER_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation handling — separate effect, only touches displayedPath/timers.
  useEffect(() => {
    if (displayedPath.current === location.pathname) return;
    displayedPath.current = location.pathname;

    if (shouldReduceMotion) {
      setDisplayed(element);
      setPhase('idle');
      return;
    }

    setPhase('exiting');
    const swapTimer = setTimeout(() => {
      setDisplayed(element);
      setPhase('entering');
    }, EXIT_MS);
    const settleTimer = setTimeout(() => {
      setPhase('idle');
    }, EXIT_MS + ENTER_DELAY_MS + ENTER_MS);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(settleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return <div style={phaseStyle(phase)}>{displayed}</div>;
}

function HeroSideLinksOnHome() {
  const location = useLocation();
  if (location.pathname !== '/') return null;
  return <HeroSideLinks />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Star Field Background — global, persists across every page */}
        <div className="stars stars-small"></div>
        <div className="stars stars-medium"></div>
        <div className="stars stars-big"></div>

        {/* Interactive circuit grid — global backdrop, zooms in sync with page transitions */}
        <GridBackdrop />

        <Cursor />
        <GlowCursor />
        <HyperdriveOverlay />
        <ScrollToTop />
        <Header />
        {/* Kept outside the zoom transition — these are position:fixed */}
        <HeroSideLinksOnHome />

        <AnimatedRoutes />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
