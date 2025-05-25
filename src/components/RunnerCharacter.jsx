import React from 'react';
import { motion } from 'framer-motion';
import astronautBoy from '../assets/astronaut-boy.png';

export default function RunnerCharacter() {
  return (
    <>
      {/* Visible border to see screen edges */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        border: '4px ',
        boxSizing: 'border-box',
        zIndex: 500,
        pointerEvents: 'none'
      }} />

      {/* Runner character */}
      <motion.div
        style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          zIndex: 1000,
        }}
        animate={{
          x: [
            0, 'calc(100vw - 60px)', 'calc(100vw - 60px)', 0, 0
          ],
          y: [
            'calc(100vh - 150px)', // ⬅ Moved up by ~16px
            'calc(100vh - 150px)',
            0,
            0,
            'calc(100vh - 150px)'
          ],
          
          rotate: [
            0, 0, -90, 180, 90
          ]
        }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1]
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


