import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import './WigglyWorm.css';

const chaosSound = new Howl({
  src: ['https://actions.google.com/sounds/v1/alarms/beep_short.ogg'],
  loop: true,
  volume: 0.5,
});

export default function WigglyWorm() {
  const wormRef = useRef(null);
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [isChaos, setIsChaos] = useState(false);

  useEffect(() => {
    let shakeTimer = null;

    const handleMouseMove = (e) => {
      const dx = e.movementX;
      const dy = e.movementY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // If speed exceeds threshold, trigger chaos
      if (speed > 40) {
        if (!isChaos) {
          setIsChaos(true);
          chaosSound.play();
          document.body.classList.add('chaos');
        }

        clearTimeout(shakeTimer);
        shakeTimer = setTimeout(() => {
          setIsChaos(false);
          chaosSound.stop();
          document.body.classList.remove('chaos');
        }, 2000);
      }

      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      chaosSound.stop();
      document.body.classList.remove('chaos');
    };
  }, [isChaos]);

  return (
    <motion.div
      ref={wormRef}
      className="wiggly-worm"
      animate={{
        x: pos.x - 50,
        y: pos.y - 50,
        rotate: isChaos ? 720 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 10,
      }}
    />
  );
}
