import React, { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  columns?: number;
  rows?: number;
  radius?: number;
  maxAngle?: number;
  className?: string;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  columns = 14,
  rows = 7,
  radius = 160,
  maxAngle = 28,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>();
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarse) return;

    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('mousemove', handleMove);

    const tick = () => {
      const m = mouse.current;
      for (const cell of cellsRef.current) {
        if (!cell) continue;
        if (!m) {
          cell.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
          cell.style.borderColor = 'rgba(96,165,250,0.06)';
          cell.style.background = 'transparent';
          continue;
        }
        const cx = cell.offsetLeft + cell.offsetWidth / 2;
        const cy = cell.offsetTop + cell.offsetHeight / 2;
        const dx = m.x - cx;
        const dy = m.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / radius);
        const rotY = (dx / radius) * maxAngle * influence;
        const rotX = -(dy / radius) * maxAngle * influence;
        const scale = 1 + influence * 0.35;
        cell.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        cell.style.borderColor = `rgba(96,165,250,${0.06 + influence * 0.45})`;
        cell.style.background = `rgba(96,165,250,${influence * 0.1})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, maxAngle]);

  const total = columns * rows;
  cellsRef.current = cellsRef.current.slice(0, total);

  return (
    <div
      ref={containerRef}
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, perspective: '700px' }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { cellsRef.current[i] = el; }}
          className="aspect-square border-r border-b transition-colors duration-150"
          style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgba(96,165,250,0.06)',
            transformStyle: 'preserve-3d',
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveGrid;
