import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  tilt?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(96,165,250,0.15)',
  tilt = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setPos({ x: px * 100, y: py * 100 });
    if (tilt) {
      rotateY.set((px - 0.5) * 10);
      rotateX.set((0.5 - py) * 10);
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX: springX, rotateY: springY, transformPerspective: 800 } : undefined}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default SpotlightCard;
