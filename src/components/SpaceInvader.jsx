import React, { useState } from 'react';
import './SpaceInvader.css';

const SpaceInvader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleGameWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Game preview button with hover effect */}
      <div 
        className={`space-button ${isHovered ? 'hover' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleGameWindow}
      >
        <div className="space-button-inner">
          <img
            src="/assets/space-preview.png"
            alt="Space Invaders"
            className="w-24 h-24 rounded-md cursor-pointer transition-transform"
          />
          <div className="space-glow"></div>
        </div>
      </div>

      {/* Floating game window with retro styling */}
      {isOpen && (
        <div className="space-window">
          <div className="space-header">
            <div className="space-title">
              <span className="pixel-text">👾 SPACE INVADERS</span>
            </div>
            <div className="space-controls">
              <button 
                onClick={toggleGameWindow} 
                className="close-button"
                title="Close Space Invaders"
              >
                X
              </button>
            </div>
          </div>
          <div className="space-screen">
            <iframe
              src="/space/index.html"
              title="Space Invaders Game"
              className="game-frame"
            />
          </div>
          <div className="space-footer">
            <div className="space-info">
              <span className="pixel-text">SCORE: 0000</span>
              <span className="pixel-text">LIVES: 3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceInvader;