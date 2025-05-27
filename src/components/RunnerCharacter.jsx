import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import astronautBoy from '../assets/astronaut-boy.png';

export default function RunnerCharacter() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Function to generate random position
  const getRandomPosition = () => {
    const padding = 0.1;
    return {
      x: Math.floor(Math.random() * (window.innerWidth - padding)),
      y: Math.floor(Math.random() * (window.innerHeight - padding)),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const boxWidth = 20;
      const boxHeight = 20;
  
      const randomX = Math.floor(Math.random() * (window.innerWidth - boxWidth));
      const randomY = Math.floor(Math.random() * (window.innerHeight - boxHeight));
      
      setPosition({ x: randomX, y: randomY });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Visible border for debugging */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
       
        boxSizing: 'border-box',
        zIndex: 500,
        pointerEvents: 'none'
      }} />

      <motion.div
        style={{
          position: 'fixed',
          width: '90px',
          height: '90px',
          zIndex: 1000,
        }}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 10,
          damping: 1,
        }}
      >
        <img
          src={astronautBoy}
          alt="Astronaut Boy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </>
  );
}
