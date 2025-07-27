import React from 'react';
import './Bird.css';

interface BirdProps {
  isFlapping: boolean;
  rotation: number; // Horizontal rotation
  pitchRotation: number; // Add pitchRotation
  scale: number;
  direction: number;
}

export const Bird: React.FC<BirdProps> = ({ isFlapping, rotation, pitchRotation, scale, direction }) => {
  return (
    <div 
      className={`bird-container ${isFlapping ? 'flapping' : ''}`}
      style={{ 
        transform: `scaleX(${direction}) rotate(${rotation}deg) rotateX(${pitchRotation}deg) scale(${scale})`,
      }}
    >
      <div className="bird">
        <div className="bird-body">
          <div className="feather-detail feather-detail-1"></div>
          <div className="feather-detail feather-detail-2"></div>
          <div className="feather-detail feather-detail-3"></div>
          <div className="feather-detail feather-detail-4"></div>
        </div>
        
        <div className="bird-breast"></div>
        
        <div className="bird-head">
          <div className="head-feather head-feather-1"></div>
          <div className="head-feather head-feather-2"></div>
          <div className="head-feather head-feather-3"></div>
        </div>
        
        <div className="bird-eye left">
          <div className="eye-reflection"></div>
          <div className="eye-highlight"></div>
        </div>
        <div className="bird-eye right">
          <div className="eye-reflection"></div>
          <div className="eye-highlight"></div>
        </div>
        
        <div className="bird-beak">
          <div className="beak-detail"></div>
          <div className="beak-tip"></div>
        </div>
        
        <div className="bird-wing left">
          <div className="wing-feather wing-feather-1"></div>
          <div className="wing-feather wing-feather-2"></div>
          <div className="wing-feather wing-feather-3"></div>
        </div>
        <div className="bird-wing right">
          <div className="wing-feather wing-feather-1"></div>
          <div className="wing-feather wing-feather-2"></div>
          <div className="wing-feather wing-feather-3"></div>
        </div>
        
        <div className="bird-tail">
          <div className="tail-feather tail-feather-1"></div>
          <div className="tail-feather tail-feather-2"></div>
          <div className="tail-feather tail-feather-3"></div>
        </div>
      </div>
    </div>
  );
}; 