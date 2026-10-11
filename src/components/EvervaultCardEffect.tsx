import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

interface EvervaultCardEffectProps {
  children: React.ReactNode;
  className?: string;
}

// Adapted from Aceternity UI's Evervault Card
// (https://ui.aceternity.com/components/evervault-card) — the mouse-tracked
// radial-gradient mask + scrambling-character reveal is the same mechanism,
// re-themed from the original green->blue gradient to this site's blue/cyan
// palette, and wrapped around real card content (a project visual + title)
// instead of the demo's standalone circle-and-word layout. Uses the
// `motion` package already installed in this project — no new dependency.
const EvervaultCardEffect: React.FC<EvervaultCardEffectProps> = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState(() => generateRandomString(2000));

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    setRandomString(generateRandomString(2000));
  };

  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div onMouseMove={onMouseMove} className={`group/evervault relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 opacity-0 group-hover/evervault:opacity-100 backdrop-blur-xl transition duration-500"
          style={style}
        />
        <motion.div
          className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/evervault:opacity-100"
          style={style}
        >
          <p className="absolute inset-0 text-[9px] leading-tight break-all whitespace-pre-wrap text-white font-mono font-bold p-2">
            {randomString}
          </p>
        </motion.div>
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default EvervaultCardEffect;
