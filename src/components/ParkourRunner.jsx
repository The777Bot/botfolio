import React, { useState } from 'react';
import './ParkourRunner.css';

const ParkourRunner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleGameWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Game preview button with hover effect */}
      <div 
        className={`parkour-button ${isHovered ? 'hover' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleGameWindow}
      >
        <div className="parkour-button-inner">
          <img
            src="/assets/parkour-preview.png"
            alt="Parkour Runner"
            className="w-24 h-24 rounded-md cursor-pointer transition-transform"
          />
          <div className="parkour-glow"></div>
        </div>
      </div>

      {/* Floating game window with retro styling */}
      {isOpen && (
        <div className="parkour-window">
          <div className="parkour-header">
            <div className="parkour-title">
              <span className="pixel-text">🏃‍♂️ PARKOUR RUNNER</span>
            </div>
            <div className="parkour-controls">
              <button 
                onClick={toggleGameWindow} 
                className="close-button"
                title="Close Parkour Runner"
              >
                X
              </button>
            </div>
          </div>
          <div className="parkour-screen">
            <iframe
              src="/parkour/index.html"
              title="Parkour Runner Game"
              className="game-frame"
            />
          </div>
          <div className="parkour-footer">
            <div className="parkour-info">
              <span className="pixel-text">SCORE: 0000</span>
              <span className="pixel-text">LIVES: 3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkourRunner; 