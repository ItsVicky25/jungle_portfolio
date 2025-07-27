import React, { useState } from 'react';
import './BirdHouse.css';

const BirdHouse: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div 
      className={`bird-house ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Bird House Structure */}
      <div className="house-body">
        <div className="house-roof"></div>
        <div className="house-entrance"></div>
        <div className="house-perch"></div>
      </div>
      
      {/* Click indicator */}
      <div className="click-hint">
        Click to {isOpen ? 'close' : 'open'}
      </div>
    </div>
  );
};

export default BirdHouse; 