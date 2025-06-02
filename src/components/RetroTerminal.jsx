import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RetroTerminal = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef(null);
  const messages = [
    "Initializing system...",
    "Loading modules...",
    "Checking dependencies...",
    "Compiling assets...",
    "Running tests...",
    "Deploying updates...",
    "System ready!",
    "Type 'help' for commands"
  ];

  useEffect(() => {
    if (isOpen) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < messages.length) {
          setText(prev => prev + messages[currentIndex] + '\n');
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            height: '60vh',
            background: '#000',
            border: '2px solid #0f0',
            borderRadius: '5px',
            padding: '20px',
            fontFamily: 'Press Start 2P, monospace',
            color: '#0f0',
            zIndex: 10000,
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>TERMINAL v1.0</span>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#0f0',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              ×
            </button>
          </div>
          <div
            ref={terminalRef}
            style={{
              height: 'calc(100% - 40px)',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {text}
            <span style={{ opacity: cursor ? 1 : 0 }}>_</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RetroTerminal; 