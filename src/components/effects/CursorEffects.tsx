import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

// Firefly type
interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  color: string;
}

const NUM_FIREFLIES = 18;
const COLORS = ['#faffb0', '#fffbe0', '#e6ffb0', '#fffacd'];

const CursorEffects: React.FC = () => {
  const { theme } = useThemeStore();
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  
  // Mouse position with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Generate fireflies on mount
  useEffect(() => {
    const newFireflies = Array.from({ length: NUM_FIREFLIES }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 4,
      opacity: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.4 + 0.2,
      angle: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setFireflies(newFireflies);
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [mouseX, mouseY]);
  
  // Fireflies animation
  useEffect(() => {
    // Initialize fireflies
    setFireflies(Array.from({ length: NUM_FIREFLIES }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 4,
      opacity: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.4 + 0.2,
      angle: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })));
  }, []);

  useEffect(() => {
    function animateFireflies() {
      setFireflies(prev => prev.map(f => {
        // Move in a gentle, wavy pattern
        const angle = f.angle + (Math.random() - 0.5) * 0.07;
        let x = f.x + Math.cos(angle) * f.speed * 2;
        let y = f.y + Math.sin(angle) * f.speed * 2;
        // Wrap around screen
        if (x < 0) x = window.innerWidth;
        if (x > window.innerWidth) x = 0;
        if (y < 0) y = window.innerHeight;
        if (y > window.innerHeight) y = 0;
        return { ...f, x, y, angle };
      }));
      animationFrame.current = requestAnimationFrame(animateFireflies);
    }
    animationFrame.current = requestAnimationFrame(animateFireflies);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);
  
  return (
    <>
      {/* Fireflies overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: theme === 'dark' ? 'screen' : 'lighten',
      }}>
        {fireflies.map(f => (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: f.x,
              top: f.y,
              width: f.size,
              height: f.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${f.color} 60%, transparent 100%)`,
              opacity: f.opacity,
              filter: 'blur(1.5px) drop-shadow(0 0 8px #fffbe0)',
              pointerEvents: 'none',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      {/* Cursor follower */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 rounded-full mix-blend-luminosity"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: '30px',
          height: '30px',
          backgroundColor: theme === 'dark' ? 'rgba(144, 238, 144, 0.3)' : 'rgba(45, 92, 59, 0.2)',
          boxShadow: theme === 'dark' 
            ? '0 0 15px 5px rgba(144, 238, 144, 0.3)' 
            : '0 0 15px 5px rgba(45, 92, 59, 0.2)',
        }}
      />
      
      {/* Fireflies */}
      {theme === 'dark' && fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="fixed rounded-full pointer-events-none z-30"
          animate={{
            opacity: fly.opacity,
            scale: [1, 1.2, 1],
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
            scale: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
          }}
          style={{
            left: fly.x,
            top: fly.y,
            width: fly.size,
            height: fly.size,
            backgroundColor: '#F0FFF0',
            boxShadow: `0 0 ${fly.size * 2}px ${fly.size}px rgba(240, 255, 240, 0.8)`,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffects;