import { useState, useEffect, useRef } from 'react';

interface Motion {
  x: number;
  y: number;
  rotation: number; // Horizontal rotation
  pitchRotation: number; // Vertical rotation
  velocity: number;
  direction: number; // 1 for right, -1 for left
}

export function useMotion(targetX: number, targetY: number, delay = 0.1) {
  const [motion, setMotion] = useState<Motion>({ x: 0, y: 0, rotation: 0, pitchRotation: 0, velocity: 0, direction: 1 });
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const velocityRef = useRef({ x: 0, y: 0 });
  const accelerationRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const springStrength = 0.12; // Softer spring for smoother movement
    const dampening = 0.85; // Increased dampening for more natural deceleration
    const maxSpeed = 15; // Limit maximum speed
    const accelerationRate = 0.2; // Gradual acceleration
    
    const animateMotion = () => {
      setMotion((prev) => {
        // Calculate desired direction
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        
        // Gradually adjust acceleration
        accelerationRef.current.x += (dx * accelerationRate - accelerationRef.current.x) * 0.1;
        accelerationRef.current.y += (dy * accelerationRate - accelerationRef.current.y) * 0.1;
        
        // Update velocity with spring physics and dampening
        velocityRef.current.x += accelerationRef.current.x * springStrength;
        velocityRef.current.y += accelerationRef.current.y * springStrength;
        
        // Apply dampening
        velocityRef.current.x *= dampening;
        velocityRef.current.y *= dampening;
        
        // Limit maximum speed
        const currentSpeed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
        if (currentSpeed > maxSpeed) {
          const scale = maxSpeed / currentSpeed;
          velocityRef.current.x *= scale;
          velocityRef.current.y *= scale;
        }
        
        // Update position
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;
        
        // Calculate velocity for animation triggers
        const velocity = Math.sqrt(
          velocityRef.current.x * velocityRef.current.x + 
          velocityRef.current.y * velocityRef.current.y
        );
        
        // Determine direction based on horizontal velocity
        let direction = prev.direction;
        if (Math.abs(velocityRef.current.x) > 0.1) { // Threshold to prevent flipping when idle
            direction = velocityRef.current.x > 0 ? 1 : -1;
        }

        // Disable rotation
        const rotation = 0;
        const pitchRotation = 0;

        prevPosition.current = { x: newX, y: newY };
        
        return {
          x: newX,
          y: newY,
          rotation,
          pitchRotation,
          velocity,
          direction,
        };
      });
      
      frameRef.current = requestAnimationFrame(animateMotion);
    };
    
    frameRef.current = requestAnimationFrame(animateMotion);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetX, targetY, delay]);
  
  return motion;
} 