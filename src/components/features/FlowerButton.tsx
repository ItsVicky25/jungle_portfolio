import React, { useState, useRef, useEffect } from 'react';
import './FlowerButton.css';

interface FlowerButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

interface Flower {
  id: number;
  xOffset: string;
  yOffset: string;
  rotation: string;
  animationDuration: string;
  animationDelay: string;
  type: 'flower' | 'bee' | 'vine';
}

const FlowerButton: React.FC<FlowerButtonProps> = ({ label, onClick, className }) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextId = useRef(0);

  const handleClick = () => {
    if (onClick) onClick();
    
    const newFlowers: Flower[] = [];
    const flowerCount = Math.floor(Math.random() * 5) + 8; // 8-12 flowers
    const beeCount = 2; // Always 2 bees
    const vineCount = 3; // 3 vines
    
    // Add flowers
    for (let i = 0; i < flowerCount; i++) {
      const angle = (i / flowerCount) * 360;
      const distance = Math.random() * 20 + 30;
      const xOffset = Math.cos(angle * Math.PI / 180) * distance;
      const yOffset = Math.sin(angle * Math.PI / 180) * distance;
      
      newFlowers.push({
        id: nextId.current++,
        xOffset: `${xOffset}px`,
        yOffset: `${Math.abs(yOffset)}px`,
        rotation: `${Math.random() * 360}deg`,
        animationDuration: `${Math.random() * 0.5 + 2}s`,
        animationDelay: `${Math.random() * 0.2}s`,
        type: 'flower'
      });
    }

    // Add bees
    for (let i = 0; i < beeCount; i++) {
      const angle = (i / beeCount) * 360;
      const distance = Math.random() * 15 + 25;
      const xOffset = Math.cos(angle * Math.PI / 180) * distance;
      const yOffset = Math.sin(angle * Math.PI / 180) * distance;

      newFlowers.push({
        id: nextId.current++,
        xOffset: `${xOffset}px`,
        yOffset: `${Math.abs(yOffset)}px`,
        rotation: `${Math.random() * 360}deg`,
        animationDuration: `${Math.random() * 0.3 + 2.5}s`,
        animationDelay: `${Math.random() * 0.3}s`,
        type: 'bee'
      });
    }

    // Add vines
    for (let i = 0; i < vineCount; i++) {
      const xOffset = (i - 1) * 30; // Spread vines across button
      
      newFlowers.push({
        id: nextId.current++,
        xOffset: `${xOffset}px`,
        yOffset: '40px',
        rotation: '0deg',
        animationDuration: '2.5s',
        animationDelay: `${i * 0.2}s`,
        type: 'vine'
      });
    }
    
    setFlowers([...newFlowers]);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setFlowers([]);
        setIsAnimating(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getEmoji = (type: 'flower' | 'bee' | 'vine') => {
    if (type === 'bee') return '🐝';
    if (type === 'vine') return '🌿';
    return ['🌸', '🌼', '🌺', '🌷', '🌹'][Math.floor(Math.random() * 5)];
  };

  return (
    <button 
      className={`flower-button ${className || ''}`}
      onClick={handleClick}
      aria-label={`${label} button with flower animation`}
    >
      <span className="button-text">{label}</span>
      <div className="flower-container">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className={`flower ${flower.type}`}
            style={{
              '--x-offset': flower.xOffset,
              '--y-offset': flower.yOffset,
              '--rotation': flower.rotation,
              animation: `${flower.type === 'bee' ? 'beeFlight' : flower.type === 'vine' ? 'vineGrow' : 'flowerBurst'} ${flower.animationDuration} ease-out ${flower.animationDelay} forwards`
            } as React.CSSProperties}
          >
            {getEmoji(flower.type)}
          </div>
        ))}
      </div>
    </button>
  );
};

export default FlowerButton; 