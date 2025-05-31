import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const blackholeSound = new Howl({
  src: ['https://freesound.org/data/previews/331/331912_3248244-lq.mp3'],
  volume: 0.9,
});

export default function BlackHoleTrap() {
  const [blackholeActive, setBlackholeActive] = useState(false);

  const handleWarningClick = () => {
    setBlackholeActive(true);
    blackholeSound.play();
    document.body.classList.add('shake');

    setTimeout(() => {
      setBlackholeActive(false);
      document.body.classList.remove('shake');
    }, 4000);
  };

  return (
    <>
      <button
        onClick={handleWarningClick}
        style={{
          position: 'fixed',
          bottom: '120px',
          left: '65px',
          background: '#9b0000',
          color: '#fff',
          fontFamily: 'Press Start 2P',
          padding: '10px',
          border: '4px double #fff',
          cursor: 'pointer',
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        ⚠️ WARNING: DO NOT PRESS
      </button>

      {blackholeActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 25, opacity: 2 }}
          transition={{ duration: 6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, #000 20%, #111 60%, transparent 90%)',
            borderRadius: '90%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        />
      )}
    </>
  );
}
