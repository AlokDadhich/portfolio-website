import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

// Uses a plain IntersectionObserver rather than motion's whileInView — that
// API turned out not to fire reliably in this project's exact dependency
// combo (confirmed: content stayed invisible indefinitely, even scrolled
// fully into view, with no error). Plain IntersectionObserver + motion's
// ordinary `animate` prop (not the viewport-tracking one) is the same
// pattern this codebase used everywhere before, and it's proven reliable.
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 24, className = '', once = true }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const hiddenState = { opacity: 0, y: shouldReduceMotion ? 0 : y };
  const shownState = { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hiddenState}
      animate={isVisible ? shownState : hiddenState}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
