import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Howl } from 'howler';

// Chaos sound (looped 8-bit alert)
const chaosSound = new Howl({
  src: ['https://freesound.org/data/previews/331/331912_3248244-lq.mp3'],
  loop: true,
  volume: 0.5,
});

// Blob shapes and colors
const blobs = [
  {
    path: 'M42.5,-67.4C56.4,-56.5,69.5,-45.2,72.7,-31.9C76,-18.5,69.4,-3.1,61.7,9.8C54.1,22.6,45.4,33,35.1,43.1C24.9,53.2,12.4,63,0.1,62.9C-12.2,62.7,-24.4,52.6,-35.6,42.3C-46.9,32.1,-57.2,21.7,-63.6,7.8C-70,-6,-72.6,-23.5,-65.9,-36.8C-59.2,-50.1,-43.2,-59.1,-28.3,-68.4C-13.4,-77.6,0.4,-87.1,12.4,-83.6C24.5,-80.1,35.8,-63.9,42.5,-67.4Z',
    color: '#00f2ff',
  },
  {
    path: 'M38.6,-68.4C52.1,-58.2,66.6,-47.5,69.3,-33.9C72,-20.3,63,-3.9,56.5,11.8C50.1,27.6,46.1,42.8,35.9,51.8C25.7,60.8,9.4,63.6,-6.5,67.3C-22.5,71,-44.9,75.6,-59.2,66.7C-73.5,57.8,-79.7,35.4,-77.3,17.3C-74.8,-0.9,-63.7,-15.8,-54.6,-30.3C-45.6,-44.8,-38.6,-58.9,-26.5,-69.8C-14.4,-80.6,2.8,-88.2,16.7,-84.6C30.6,-81,41.2,-66.7,38.6,-68.4Z',
    color: '#ff00b3',
  },
  {
    path: 'M32.8,-9.5C41.3,15.5,46.2,42.9,31.8,56.4C17.4,69.8,-16.3,69.3,-27.4,56.8C-38.5,44.2,-26.9,19.6,-18.6,-5.2C-10.3,-30,-5.1,-54.9,3.5,-56.1C12.1,-57.2,24.3,-34.5,32.8,-9.5Z',
    color: '#ffae00',
  },
  {
    path: 'M33.5,-59.7C47.2,-51.7,63.5,-45.3,69.8,-34.1C76.1,-23,72.3,-7,64.2,4.3C56.2,15.6,43.9,22.1,34.4,30.4C24.9,38.7,18.1,48.7,7.4,54.8C-3.2,60.9,-17.8,63.1,-30.2,58.6C-42.5,54,-52.5,42.6,-60.2,30.1C-67.9,17.5,-73.4,3.7,-66.7,-6.8C-60.1,-17.3,-41.2,-24.5,-28.5,-35.2C-15.8,-45.8,-9.4,-59.8,2.2,-63C13.7,-66.2,27.4,-58,33.5,-59.7Z',
    color: '#8f00ff',
  },
  {
    path: 'M18.7,-26.6C29.4,-18,46.8,-19.4,57.2,-12.6C67.6,-5.8,71,9.2,67.3,22.2C63.5,35.2,52.5,46.1,40.1,49C27.7,51.9,13.8,46.7,3.5,41.9C-6.9,37.1,-13.7,32.8,-29.3,30.9C-44.9,29,-69.1,29.7,-80.5,20.1C-92,10.5,-90.7,-9.3,-77.5,-17.5C-64.2,-25.8,-39.1,-22.5,-24.2,-29.7C-9.3,-36.8,-4.7,-54.4,-0.3,-54C4,-53.6,8.1,-35.1,18.7,-26.6Z',
    color: '#FF0066',
  }
];

export default function WigglyWorm() {
  const [blobPos, setBlobPos] = useState({ x: 200, y: 200 });
  const [pathIndex, setPathIndex] = useState(0);
  const [isChaos, setIsChaos] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [emotion, setEmotion] = useState('idle');

  const x = useMotionValue(200);
  const y = useMotionValue(200);
  const springX = useSpring(x, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  const offsetX = useMotionValue(200);
  const offsetY = useMotionValue(200);
  const eyeOffsetX = useMotionValue(0);
  const eyeOffsetY = useMotionValue(0);

  let shakeTimer = null;
  let flashInterval = null;

  const handleMovement = (clientX, clientY, movementX = 0, movementY = 0) => {
    const dx = movementX;
    const dy = movementY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    setBlobPos({ x: clientX, y: clientY });

    x.set(clientX - 250);
    y.set(clientY + 100);

    eyeOffsetX.set((clientX % 20 - 10) / 2);
    eyeOffsetY.set((clientY % 20 - 10) / 2);

    if (speed > 130 && !isChaos) {
      setIsChaos(true);
      chaosSound.play();
      document.body.classList.add('chaos');
      setPathIndex(1);
      startChaosFlashes();

      clearTimeout(shakeTimer);
      shakeTimer = setTimeout(() => {
        setIsChaos(false);
        chaosSound.stop();
        document.body.classList.remove('chaos');
        stopChaosFlashes();
      }, 2000);
    }
  };

  const startChaosFlashes = () => {
    let hue = 0;
    flashInterval = setInterval(() => {
      document.body.style.backgroundColor = `hsl(${hue}, 100%, 80%)`;
      hue = (hue + 40) % 360;
    }, 80);
  };

  const stopChaosFlashes = () => {
    clearInterval(flashInterval);
    document.body.style.backgroundColor = '';
  };

  useEffect(() => {
    const unsubX = springX.on("change", v => offsetX.set(v - 90));
    const unsubY = springY.on("change", v => offsetY.set(v - 90));

    const morphTimer = setInterval(() => {
      if (!isChaos) {
        setPathIndex((prev) => (prev + 1) % blobs.length);
      }
    }, 3000);

    const handleMouseMove = (e) => handleMovement(e.clientX, e.clientY, e.movementX, e.movementY);
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const movementX = touch.clientX - lastTouch.x;
      const movementY = touch.clientY - lastTouch.y;
      setLastTouch({ x: touch.clientX, y: touch.clientY });
      handleMovement(touch.clientX, touch.clientY, movementX, movementY);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleClick = (e) => {
      const dx = e.clientX - blobPos.x;
      const dy = e.clientY - blobPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 1000) {
        const emotions = ['happy', 'angry', 'sad'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setEmotion(randomEmotion);
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('click', handleClick);

      chaosSound.stop();
      stopChaosFlashes();
      document.body.classList.remove('chaos');
      clearInterval(morphTimer);
      unsubX();
      unsubY();
    };
  }, [x, y, isChaos, lastTouch]);

  const getEmotionText = () => {
    if (emotion === 'angry') return '😠 ANGRY';
    if (emotion === 'happy') return '😊 HAPPY';
    if (emotion === 'sad') return '😢 SAD';
    return null;
  };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      style={{
        width: 200,
        height: 200,
        position: 'fixed',
        pointerEvents: 'auto',
        zIndex: 1000,
        x: offsetX,
        y: offsetY,
      }}
    >
      {/* Blob shape */}
      <motion.path
        fill={
          emotion === 'angry' ? '#CC0000' :
          emotion === 'happy' ? '#FF9900' :
          emotion === 'sad' ? '#404040' :
          blobs[pathIndex].color
        }
        animate={{ d: blobs[pathIndex].path }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        transform="translate(100 100)"
      />

      {/* Eyes */}
      <motion.rect x={78} y={83} width={20} height={20} fill="#fff" />
      <motion.rect x={108} y={83} width={20} height={20} fill="#fff" />
      <motion.rect x={85} y={90} width={6} height={6} fill="#000" style={{ x: eyeOffsetX, y: eyeOffsetY }} />
      <motion.rect x={115} y={90} width={6} height={6} fill="#000" style={{ x: eyeOffsetX, y: eyeOffsetY }} />
     
      {/* Speech bubble */}
      <g transform="translate(100, 10)">
        <rect
          x={-100}
          y={-30}
          rx={10}
          ry={10}
          width={180}
          height={40}
          fill="#fff"
          stroke="#fff"
          strokeWidth={5}
        />
        <text
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#000"
          fontSize="18"
          fontFamily="'Press Start 2P', cursive"
        >
          Catch me!
        </text>
      </g>

      {/* Emotion label */}
      {emotion !== 'idle' && (
        <text
          x="100"
          y="180"
          textAnchor="middle"
          fill="#fff"
          fontSize="10"
          fontFamily="Press Start 2P"
        >
          {getEmotionText()}
        </text>
      )}
    </motion.svg>
  );
}
