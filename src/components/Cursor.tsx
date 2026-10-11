import React, { useEffect, useState } from 'react';

// The dot+ring cursor moved to GlowCursor.tsx (a richer glowing trail).
// This component now only handles the large ambient page-wide glow.
const Cursor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return;

    const handleMove = (e: MouseEvent) => {
      setGlowPos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
    };
    const handleLeave = () => setIsActive(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-300"
      style={{
        opacity: isActive ? 1 : 0,
        background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(59,130,246,0.15), rgba(59,130,246,0.05) 40%, transparent 70%)`,
      }}
    />
  );
};

export default Cursor;
