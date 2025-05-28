import React, { useState } from 'react';
import './ArcadeLauncher.css';

const ArcadeLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleGameWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Game preview button with hover effect */}
      <div 
        className={`arcade-button ${isHovered ? 'hover' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleGameWindow}
      >
        <div className="arcade-button-inner">
          <img
            src="/arcade-preview.png"
            alt="Arcade Game"
            className="w-24 h-24 rounded-md cursor-pointer transition-transform"
          />
          <div className="arcade-glow"></div>
        </div>
      </div>

      {/* Floating game window with retro styling */}
      {isOpen && (
        <div className="arcade-window">
          <div className="arcade-header">
            <div className="arcade-title">
              <span className="pixel-text">🕹️ RETRO ARCADE</span>
            </div>
            <div className="arcade-controls">
              <button 
                onClick={toggleGameWindow} 
                className="close-button"
              >
                ✖
              </button>
            </div>
          </div>
          <div className="arcade-screen">
            <iframe
              src="/arcade/index.html"
              title="Mini Arcade Game"
              className="game-frame"
            />
          </div>
          <div className="arcade-footer">
            <div className="arcade-info">
              <span className="pixel-text">SCORE: 0000</span>
              <span className="pixel-text">LIVES: 3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArcadeLauncher;
