import React, { useEffect, useState } from 'react';
import { Bird } from './Bird';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import { useMotion } from '../../hooks/useMotion';
import './Bird.css';

interface BirdCursorProps {
  delay?: number;
  flappingThreshold?: number;
}

export const BirdCursor: React.FC<BirdCursorProps> = ({ 
  delay = 0.08, 
  flappingThreshold = 1.5,
}) => {
  const { x, y } = useCursorPosition();
  
  const { x: birdX, y: birdY, rotation, pitchRotation, velocity, direction } = useMotion(x, y, delay);
  const [isFlapping, setIsFlapping] = useState(false);
  const [flapIntensity, setFlapIntensity] = useState(1);
  
  useEffect(() => {
    if (velocity > flappingThreshold) {
      setIsFlapping(true);
      setFlapIntensity(Math.min(1.5, velocity / flappingThreshold));
    } else {
      const timer = setTimeout(() => {
        setIsFlapping(false);
        setFlapIntensity(1);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [velocity, flappingThreshold]);
  
  // Set a base scale to be a bit smaller
  const baseScale = 0.45; 
  const dynamicScale = Math.max(0.9, 1 - (velocity * 0.001));
  const scale = baseScale * dynamicScale;
  
  return (
    <div
      className="bird-cursor"
      style={{
        position: 'fixed',
        left: `${birdX}px`,
        top: `${birdY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'none',
        animationDuration: `${0.8 / flapIntensity}s`,
      }}
    >
      <Bird 
        isFlapping={isFlapping} 
        rotation={rotation} 
        pitchRotation={pitchRotation}
        scale={scale} 
        direction={direction}
      />
    </div>
  );
}; 