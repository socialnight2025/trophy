import React, { useEffect, useState, useCallback } from 'react';
import sakuraImg from '../assets/sakurap.webp';

function SakuraPetalsTailwind() {
  const [petals, setPetals] = useState([]);

  // Remove petal by id
  const handleAnimationEnd = useCallback((id) => {
    setPetals(prev => prev.filter(p => p.id !== id));
  }, []);

  useEffect(() => {
    const createPetal = () => {
      const swayDir = Math.random() > 0.5 ? 1 : -1;
      const newPetal = {
        id: Math.random(),
        left: Math.random() * 100 + 'vw',
        duration: Math.random() * 5 + 10, // 5-10s
        delay: Math.random() * 2, // 0-2s
        size: Math.random() * 8 + 8, // 16-32px
        sway: Math.random() * 24 + 16, // 16-40px
        swayDir,
        rotateStart: Math.random() * 360,
        rotateEnd: Math.random() * 360,
      };
      setPetals(prev => [...prev, newPetal]);
    };
    const interval = setInterval(createPetal, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map(petal => (
        <img
          key={petal.id}
          src={sakuraImg}
          alt="sakura petal"
          className={
            `absolute top-0 sakura-fall select-none`
          }
          style={{
            left: petal.left,
            width: petal.size,
            height: 'auto',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            '--sway': `${petal.sway}px`,
            '--sway-dir': petal.swayDir,
            '--rotate-start': `${petal.rotateStart}deg`,
            '--rotate-end': `${petal.rotateEnd}deg`,
            transform: `rotate(${petal.rotateStart}deg)`
          }}
          onAnimationEnd={() => handleAnimationEnd(petal.id)}
          draggable={false}
        />
      ))}
    </div>
  );
}

export default SakuraPetalsTailwind;
