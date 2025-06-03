import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MonsterEffect.css';

const MonsterEffect = ({ isActive, onComplete }) => {
  const [eatenElements, setEatenElements] = useState([]);
  const [monsterPosition, setMonsterPosition] = useState({ x: 0, y: 0 });
  const [isEating, setIsEating] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);

  useEffect(() => {
    if (isActive) {
      // Get all elements that can be eaten
      const elements = Array.from(document.querySelectorAll('.App > *:not(.monster-effect)'))
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0; // Only visible elements
        });

      let currentIndex = 0;

      const eatNextElement = () => {
        if (currentIndex < elements.length) {
          const element = elements[currentIndex];
          const rect = element.getBoundingClientRect();
          
          // Set current target for visual feedback
          setCurrentTarget(element);
          
          // Move monster to element with a more dynamic path
          setMonsterPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });

          // Start eating animation
          setIsEating(true);
          
          // Add element to eaten list
          setEatenElements(prev => [...prev, currentIndex]);
          
          // Create a highlight effect around the current target
          element.style.transition = 'all 0.5s ease-in-out';
          element.style.boxShadow = '0 0 20px rgba(155, 0, 0, 0.5)';
          
          // Hide the element with a bite effect
          setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8) rotate(10deg)';
            element.style.boxShadow = 'none';
          }, 300);
          
          // Add bite marks
          const biteMark = document.createElement('div');
          biteMark.className = 'bite-mark';
          biteMark.style.left = `${rect.left + rect.width / 2}px`;
          biteMark.style.top = `${rect.top + rect.height / 2}px`;
          document.body.appendChild(biteMark);
          
          // Remove bite mark after animation
          setTimeout(() => {
            biteMark.remove();
          }, 1000);
          
          currentIndex++;
          setTimeout(() => {
            setIsEating(false);
            setCurrentTarget(null);
            setTimeout(eatNextElement, 200);
          }, 500);
        } else {
          // All elements eaten
          setTimeout(() => {
            onComplete?.();
          }, 1000);
        }
      };

      eatNextElement();
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="monster-effect"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: 'fixed',
            left: monsterPosition.x,
            top: monsterPosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            pointerEvents: 'none'
          }}
        >
          <div className={`monster ${isEating ? 'eating' : ''}`}>
            <div className="monster-body">
              <div className="monster-eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
              <div className="monster-mouth"></div>
              <div className="monster-teeth"></div>
            </div>
          </div>
          {currentTarget && (
            <div className="target-indicator">
              <div className="target-ring"></div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MonsterEffect; 