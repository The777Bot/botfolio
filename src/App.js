import './retro.css'; // Import retro style
import { ThemeProvider, useTheme } from './context/ThemeContext';
import WavyBlob from './components/WavyBlob';
import WigglyWorm from './components/WigglyWorm';
import LightGreyBox from './components/LightGreyBox';
import BlackHoleTrap from './components/BlackHoleTrap';
import ArcadeLauncher from './components/ArcadeLauncher';
import RunnerCharacter from './components/RunnerCharacter';
import CycloneEffect from './components/CycloneEffect';
import MonsterEffect from './components/MonsterEffect';
import WeatherSystem from './components/WeatherSystem';
import './components/WeatherSystem.css';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import SpaceInvader from './components/SpaceInvader';
import GithubContributions from './components/GithubContributions';
import GithubProjects from './components/GithubProjects';
import ColorBalls from './components/ColorBalls';
import ParkourRunner from './components/ParkourRunner';

function AppContent() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCycloneActive, setIsCycloneActive] = useState(false);
  const [isRearranged, setIsRearranged] = useState(false);
  const [isMonsterActive, setIsMonsterActive] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const cooldownRef = useRef(false);
  const timeoutsRef = useRef({
    cyclone: null,
    rearrange: null,
    cooldown: null
  });
  const navigate = useNavigate();

  const handleMonsterComplete = () => {
    setIsMonsterActive(false);
    // Restore UI elements
    const elements = document.querySelectorAll('.App > *:not(.monster-effect)');
    elements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    });
  };

  const handleCycloneTrigger = () => {
    if (!cooldownRef.current) {
      // Clear any existing timeouts
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });

      // Start cyclone
      setIsCycloneActive(true);
      setIsRearranged(true);
      
      // Remove cyclone effect after 1 second
      timeoutsRef.current.cyclone = setTimeout(() => {
        setIsCycloneActive(false);
        
        // Keep the rearrangement active for longer
        timeoutsRef.current.rearrange = setTimeout(() => {
          setIsRearranged(false);
        }, 3000); // Keep rearranged state for 3 seconds
        
        // Start cooldown period
        cooldownRef.current = true;
        timeoutsRef.current.cooldown = setTimeout(() => {
          cooldownRef.current = false;
        }, 15000); // 15 seconds cooldown
      }, 1000);
    }
  };

  // Remove the mouse movement effect
  useEffect(() => {
    // Clear all timeouts on cleanup
    return () => {
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const handleSummonMonster = () => {
    setIsMonsterActive(true);
  };

  return (
    <div className="App" style={{ 
      backgroundColor: 'var(--bg-color)', 
      color: 'var(--text-color)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      filter: isGrayscale ? 'grayscale(100%)' : 'none',
      transition: 'filter 0.3s ease'
    }}>
      <WeatherSystem isDarkMode={isDarkMode} />
      {/* Fixed Header */}
      <motion.header
        animate={{
          x: isRearranged ? Math.random() * 100 - 50 : 0,
          y: isRearranged ? Math.random() * 100 - 50 : 0,
          rotate: isRearranged ? Math.random() * 20 - 10 : 0
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'var(--header-bg)',
          color: 'var(--text-color)',
          fontFamily: 'Press Start 2P',
          fontSize: 'clamp(12px, 1.2vw, 24px)',
          padding: '1vh',
          textAlign: 'center',
          borderBottom: '0.5vh double var(--text-color)',
          zIndex: 1001,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        ubadahme@gmail.com
      </motion.header>

      {/* Fixed Dark Mode Toggle (restored to original position) */}
      <motion.button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '100px',
          left: '20px',
          zIndex: 1000,
          width: 'clamp(40px, 5vw, 50px)',
          height: 'clamp(30px, 2vh, 40px)',
          borderRadius: '15px',
          background: isDarkMode ? '#2d2d2d' : '#f2aeb9',
          border: '2px solid ' + (isDarkMode ? '#f2f2f2' : '#2d2d2d'),
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: isDarkMode ? '#f2aeb9' : '#2d2d2d',
            position: 'absolute',
            left: isDarkMode ? 'calc(100% - 26px)' : '2px',
            transition: 'all 0.3s ease'
          }}
        />
        <span style={{
          position: 'absolute',
          color: isDarkMode ? '#2d2d2d' : '#f2f2f2',
          fontSize: '18px',
          left: isDarkMode ? '8px' : 'auto',
          right: isDarkMode ? 'auto' : '8px'
        }}>
          {isDarkMode ? '🌞' : '🌙'}
        </span>
      </motion.button>

      {/* --- Grouped Fixed Buttons (now only Color Balls!) --- */}
      <motion.div
        style={{
          position: 'fixed',
          top: '50%',
          right: '1vw',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '25px',
          transform: 'translateY(-50%) translateZ(0)',
          willChange: 'transform'
        }}
        animate={{
          x: isRearranged ? Math.random() * 50 - 25 : 0,
          y: isRearranged ? Math.random() * 50 - 25 : 0,
          rotate: isRearranged ? Math.random() * 10 - 5 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Cyclone Trigger Button */}
        <motion.button
          onClick={handleCycloneTrigger}
          className="cyclone-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            top: '20px',
            background: 'linear-gradient(45deg, #1a1a1a, #333333)',
            color: '#00ff88',
            border: '3px solid #00ff88',
            borderRadius: '18px',
            fontFamily: 'VT323, monospace',
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5), inset 0 0 5px rgba(0, 255, 136, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            textShadow: '0 0 5px rgba(0, 255, 136, 0.5)'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 15px rgba(0, 255, 136, 0.7), inset 0 0 8px rgba(0, 255, 136, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span style={{ fontSize: '20px' }}>🌪️</span>
          <span>TRIGGER CYCLONE</span>
        </motion.button>

        {/* Color Balls! Button (remains here) */}
        <motion.button
          id="color-ball-trigger"
          style={{
            position: 'relative',
            bottom: '0',
            right: '0',
            padding: '10px 20px',
            background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Press Start 2P',
            fontSize: '12px',
            zIndex: 1001,
            animation: 'rainbow-glow 3s linear infinite'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Color Balls!
        </motion.button>

        {/* Warning Button (BlackHoleTrap) is now separate again) */}
      </motion.div>

      {/* Monster Effect */}
      <MonsterEffect isActive={isMonsterActive} onComplete={handleMonsterComplete} />

      {/* Content Area - This will shake */} 
      <div className="content-area" style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'calc(5vh + 2vw)',
        paddingLeft: '2vw',
        paddingRight: '2vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Background Effects */}
        {isDarkMode ? (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, #000000 0%, #1a1a1a 100%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}>
            {/* Stars */}
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  background: '#fff',
                  borderRadius: '50%',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${1 + Math.random() * 3}s infinite alternate`,
                  opacity: Math.random() * 0.8 + 0.2,
                  boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
                }}
              />
            ))}
            {/* Shooting Stars */}
            {[...Array(5)].map((_, i) => (
              <div
                key={`shooting-${i}`}
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #fff)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: 'rotate(-45deg)',
                  animation: `shootingStar ${3 + Math.random() * 5}s infinite`,
                  opacity: 0,
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                }}
              />
            ))}
          </div>
        ) : (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}>
            {/* Sun */}
            <div style={{
              position: 'absolute',
              top: '8%',
              right: '8%',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at center, #FFD700 0%, #FFA500 50%, transparent 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 100px #FFD700, 0 0 150px #FFA500',
              animation: 'pulse 4s infinite alternate',
              zIndex: 1
            }}>
              {/* Sun Rays */}
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '2px',
                    height: '5px',
                    background: 'linear-gradient(to top, rgba(255, 215, 0, 0.8), transparent)',
                    transform: `rotate(${i * 15}deg) translateY(-50%)`,
                    transformOrigin: 'center',
                    animation: 'rotate 20s linear infinite',
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
            
            {/* Sunlight Rays */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`ray-${i}`}
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: '30px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.1), transparent)',
                  transform: `rotate(${i * 45 - 90}deg) translateX(50%)`,
                  transformOrigin: 'top center',
                  filter: 'blur(20px)',
                  animation: 'pulse 4s infinite alternate',
                  zIndex: 0
                }}
              />
            ))}
    </div>
        )}

        {/* Welcome Title */}
        <h1 style={{ 
          textAlign: 'center', 
          marginTop: '2vh',
          marginBottom: '4vh',
          fontSize: 'clamp(20px, 2.8vw, 40px)',
          position: 'relative'
        }}>
          <span style={{ color: '#FFD700' }}>Welcome to Botfolio 🧠</span>
          <br />
          <small style={{ fontSize: 'clamp(12px, 1vw, 16px)', color: isDarkMode ? '#f2f2f2' : '#000000' }}>
            An Interactive Fun Portfolio site...
          </small>
        </h1>

        {/* Pac-Man Button - positioned like warning button */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
          pointerEvents: 'auto',
          zIndex: 10000
        }}>
          <motion.button
            onClick={handleSummonMonster}
            className="pacman-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>⚠️</span>
            <span>SUMMON PAC-MAN</span>
          </motion.button>
        </div>
        
        {/* Content Sections */}
        <motion.div
          animate={{
            x: isRearranged ? Math.random() * 200 - 100 : 0,
            y: isRearranged ? Math.random() * 200 - 100 : 0,
            rotate: isRearranged ? Math.random() * 30 - 15 : 0
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the main content area
            width: '100%',
            position: 'relative',
            gap: '2vw',
            padding: '0 2vw'
          }}
        >
          {/* Left Section - GitHub Window (unchanged width) */}
          <motion.section
            animate={{
              x: isRearranged ? Math.random() * 150 - 75 : 0,
              y: isRearranged ? Math.random() * 150 - 75 : 0,
              rotate: isRearranged ? Math.random() * 25 - 12.5 : 0
            }}
            transition={{ duration: 0.5 }}
            style={{ 
              width: '20%',
              padding: '1vw',
              color: 'var(--text-color)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '2vw'
            }}
          >
            <LightGreyBox />
            <GithubContributions />
          </motion.section>

          {/* Center Section - Main Content (now holds games) */}
          <motion.section
            animate={{
              x: isRearranged ? Math.random() * 150 - 75 : 0,
              y: isRearranged ? Math.random() * 150 - 75 : 0,
              rotate: isRearranged ? Math.random() * 25 - 12.5 : 0
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: '60%', // Increased width to hold games
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexWrap: 'wrap', // Allow games to wrap if screen is small
              gap: '1vw', // Gap between games
            }}
          >
            {/* Moved Games Here */}
            <ArcadeLauncher />
            <SpaceInvader />
            <ParkourRunner />
          </motion.section>

          {/* Right Section (now minimized or empty) */}
          <motion.section
            animate={{
              x: isRearranged ? Math.random() * 150 - 75 : 0,
              y: isRearranged ? Math.random() * 150 - 75 : 0,
              rotate: isRearranged ? Math.random() * 25 - 12.5 : 0
            }}
            transition={{ duration: 2 }}
            style={{ 
              width: '20%', // Minimized width or could be 0
              padding: '1vw',
              color: 'var(--text-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vw'
            }}
          >
            {/* This section is now empty or contains other minor elements */}
          </motion.section>
        </motion.div>

        {/* Warning Button (BlackHoleTrap) - moved to center below games */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px', // Add some space below the games
          marginBottom: '40px', // Add some space above the footer
          pointerEvents: 'auto', // Ensure button is clickable
          zIndex: 10000 // Ensure it's above other elements if needed
        }}>
          <BlackHoleTrap />
        </div>

        {/* Interactive Elements */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 3
        }}>
          <RunnerCharacter />
          <WavyBlob />
          <WigglyWorm />
        </div>
      </div>

      {/* Fixed Footer */}
      <motion.footer
        animate={{
          x: isRearranged ? Math.random() * 100 - 50 : 0,
          y: isRearranged ? Math.random() * 100 - 50 : 0,
          rotate: isRearranged ? Math.random() * 20 - 10 : 0
        }}
        transition={{ duration: 5 }}
        style={{
        position: 'fixed',
        bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--footer-bg)',
        color: '#9bbc0f',
        fontFamily: 'Press Start 2P',
          fontSize: 'clamp(10px, 0.8vw, 16px)',
          padding: '0.5vh',
        textAlign: 'center',
          borderTop: '0.2vh double #9bbc0f',
          zIndex: 10000,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        STATUS: READY 🕹️ | FPS: 60 | SHAKE TO TRIGGER CYCLONE 🌪️
      </motion.footer>

      {/* Cyclone Effect */}
      <CycloneEffect isActive={isCycloneActive} />

      <ColorBalls />

      {/* Grayscale Button */}
      <motion.button
        onClick={() => setIsGrayscale(!isGrayscale)}
        style={{
          position: 'fixed',
          left: '20px',
          top: '160px',
          background: 'linear-gradient(45deg, #1a1a1a, #333333)',
          color: isGrayscale ? '#00ff88' : '#ffffff',
          border: '3px solid rgb(45, 65, 56)',
          borderRadius: '18px',
          fontFamily: 'VT323, monospace',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          padding: '8px 16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isGrayscale 
            ? '0 0 15px rgba(0, 255, 136, 0.7), inset 0 0 8px rgba(0, 255, 136, 0.5)'
            : '0 0 10px rgba(0, 255, 136, 0.5), inset 0 0 5px rgba(0, 255, 136, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textShadow: '0 0 5px rgba(0, 255, 136, 0.5)'
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 15px rgba(0, 255, 136, 0.7), inset 0 0 8px rgba(0, 255, 136, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span style={{ fontSize: '20px' }}>🎨</span>
        <span>{isGrayscale ? 'RESTORE COLORS' : 'GRAYSCALE'}</span>
      </motion.button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;