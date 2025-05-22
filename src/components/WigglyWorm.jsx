import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Howl } from 'howler';

const chaosSound = new Howl({
  src: ['https://actions.google.com/sounds/v1/alarms/beep_short.ogg'],
  loop: true,
  volume: 0.5,
});

const blobs = [
  {
    path: 'M42.5,-67.4C56.4,-56.5,69.5,-45.2,72.7,-31.9C76,-18.5,69.4,-3.1,61.7,9.8C54.1,22.6,45.4,33,35.1,43.1C24.9,53.2,12.4,63,0.1,62.9C-12.2,62.7,-24.4,52.6,-35.6,42.3C-46.9,32.1,-57.2,21.7,-63.6,7.8C-70,-6,-72.6,-23.5,-65.9,-36.8C-59.2,-50.1,-43.2,-59.1,-28.3,-68.4C-13.4,-77.6,0.4,-87.1,12.4,-83.6C24.5,-80.1,35.8,-63.9,42.5,-67.4Z',
    color: '#00f2ff',
  },
  {
    path: 'M38.6,-68.4C52.1,-58.2,66.6,-47.5,69.3,-33.9C72,-20.3,63,-3.9,56.5,11.8C50.1,27.6,46.1,42.8,35.9,51.8C25.7,60.8,9.4,63.6,-6.5,67.3C-22.5,71,-44.9,75.6,-59.2,66.7C-73.5,57.8,-79.7,35.4,-77.3,17.3C-74.8,-0.9,-63.7,-15.8,-54.6,-30.3C-45.6,-44.8,-38.6,-58.9,-26.5,-69.8C-14.4,-80.6,2.8,-88.2,16.7,-84.6C30.6,-81,41.2,-66.7,38.6,-68.4Z',
    color: '#ff00b3',
  }
];


export default function WigglyWorm() {
  const [pathIndex, setPathIndex] = useState(0);
  const [isChaos, setIsChaos] = useState(false);

  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const springX = useSpring(x, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const morphTimer = setInterval(() => {
      if (!isChaos) {
        setPathIndex((prev) => (prev + 1) % blobs.length);
      }
    }, 3000);

    let shakeTimer = null;

    const handleMouseMove = (e) => {
      const dx = e.movementX;
      const dy = e.movementY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      x.set(e.clientX - 100);
      y.set(e.clientY - 100);

      if (speed > 40 && !isChaos) {
        setIsChaos(true);
        chaosSound.play();
        document.body.classList.add('chaos');
        setPathIndex(1);

        clearTimeout(shakeTimer);
        shakeTimer = setTimeout(() => {
          setIsChaos(false);
          chaosSound.stop();
          document.body.classList.remove('chaos');
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      chaosSound.stop();
      document.body.classList.remove('chaos');
      clearInterval(morphTimer);
    };
  }, [x, y, isChaos]);

  return (
    <>
      <motion.svg
        viewBox="0 0 200 200"
        style={{
          width: 200,
          height: 200,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1000,
          x: springX,
          y: springY
        }}
      >
        <motion.path
          fill={blobs[pathIndex].color}
          animate={{ d: blobs[pathIndex].path }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          transform="translate(100 100)"
        />
      </motion.svg>

      {/* Eyes */}
      <motion.div
        style={{
          position: 'fixed',
          x: springX,
          y: springY,
          width: 200,
          height: 200,
          pointerEvents: 'none',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{
            width: 14,
            height: 14,
            background: '#000',
            borderRadius: '50%'
          }} />
          <div style={{
            width: 14,
            height: 14,
            background: '#000',
            borderRadius: '50%'
          }} />
        </div>
      </motion.div>
    </>
  );
}
