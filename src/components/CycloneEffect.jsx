import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CycloneEffect = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Create cyclone particles with more varied properties
      const newParticles = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 8,
        duration: Math.random() * 4 + 5,
        delay: Math.random() * 1.2,
        rotationSpeed: Math.random() * 3 + 1.5,
        spiralRadius: Math.random() * 150 + 100,
        opacity: Math.random() * 0.6 + 0.4
      }));
      setParticles(newParticles);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden',
          background: 'radial-gradient(circle at center, rgba(240, 194, 94, 0.2) 50%, rgba(243, 177, 78, 0) 70%)'
        }}>
          {/* Cyclone particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: particle.x,
                y: particle.y,
                rotate: 0,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: [
                  particle.x,
                  window.innerWidth / 2 + Math.cos(particle.rotationSpeed * Math.PI) * particle.spiralRadius,
                  window.innerWidth / 2
                ],
                y: [
                  particle.y,
                  window.innerHeight / 2 + Math.sin(particle.rotationSpeed * Math.PI) * particle.spiralRadius,
                  window.innerHeight / 2
                ],
                rotate: 360 * particle.rotationSpeed,
                scale: [0, 1.2, 0.9],
                opacity: [0, particle.opacity, 0]
              }}
              exit={{ 
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 300,
                rotate: 720,
                scale: 0,
                opacity: 0
              }}
              transition={{ 
                duration: particle.duration,
                delay: particle.delay,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.6, 1]
              }}
              style={{
                position: 'absolute',
                width: particle.size,
                height: particle.size,
                background: 'radial-gradient(circle, rgba(245, 167, 79, 0.95) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(1px)',
                boxShadow: '0 0 12px rgba(241, 201, 89, 0.8)',
                mixBlendMode: 'screen'
              }}
            />
          ))}
          {/* Cyclone center glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(250, 213, 90, 0.5) 0%, rgba(255,255,255,0) 70%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              mixBlendMode: 'screen'
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default CycloneEffect; 