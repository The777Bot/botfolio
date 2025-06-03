import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './monster.css'; // optional: for custom animations

const NotFound = () => {
  const [eatProgress, setEatProgress] = useState(0);
  const [showMonster, setShowMonster] = useState(false);
  const [errorMessages] = useState([
    "ERROR: Page not found!",
    "WARNING: Monster detected!",
    "CRITICAL: UI being consumed!",
    "ALERT: System compromised!",
    "FATAL: Run while you can!"
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Start the monster animation after a short delay
    const monsterTimer = setTimeout(() => {
      setShowMonster(true);
    }, 1000);

    // Start the eating progress
    const eatInterval = setInterval(() => {
      setEatProgress(prev => {
        if (prev >= 100) {
          clearInterval(eatInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Rotate through error messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % errorMessages.length);
    }, 2000);

    return () => {
      clearTimeout(monsterTimer);
      clearInterval(eatInterval);
      clearInterval(messageInterval);
    };
  }, [errorMessages.length]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'black',
      color: 'lime',
      fontFamily: 'Press Start 2P',
      overflow: 'hidden',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="error-message"
        data-text="404"
        style={{ fontSize: '3rem', marginBottom: '2rem' }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glitch-text"
        style={{ fontSize: '1rem', marginBottom: '2rem' }}
      >
        {errorMessages[currentMessage]}
      </motion.p>

      {/* Eaten area effect */}
      <div 
        className="eaten-area"
        style={{ height: `${eatProgress}%` }}
      />

      {/* Monster container */}
      <AnimatePresence>
        {showMonster && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="monster-container"
          >
            <div className="monster">
              <div className="monster-eye left" />
              <div className="monster-eye right" />
              <div className="monster-mouth" />
              <div className="monster-teeth">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="monster-tooth" />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ 
          marginTop: '2rem',
          position: 'relative',
          zIndex: 10001
        }}
      >
        <motion.a
          href="/"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            color: '#f0f',
            textDecoration: 'underline',
            padding: '10px 20px',
            border: '2px solid #f0f',
            borderRadius: '5px'
          }}
        >
          ESCAPE TO HOME
        </motion.a>
      </motion.p>
    </div>
  );
};

export default NotFound;
