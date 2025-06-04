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
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';

function AppContent() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCycloneActive, setIsCycloneActive] = useState(false);
  const [isRearranged, setIsRearranged] = useState(false);
  const [isMonsterActive, setIsMonsterActive] = useState(false);
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

  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calculate the distance moved
      const deltaX = Math.abs(currentX - lastMouseX);
      const deltaY = Math.abs(currentY - lastMouseY);
      
      // Only trigger if not on cooldown
      if (!cooldownRef.current && (deltaX > 800 || deltaY > 800)) {
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
      
      lastMouseX = currentX;
      lastMouseY = currentY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Clear all timeouts on cleanup
      Object.values(timeoutsRef.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <div className="App" style={{ 
      backgroundColor: 'var(--bg-color)', 
      color: 'var(--text-color)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh'
    }}>
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

      {/* Monster Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMonsterActive(true)}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '20px',
          background: '#9b0000',
          color: '#fff',
          border: '2px solid #fff',
          padding: '10px 20px',
          borderRadius: '5px',
          fontFamily: 'Press Start 2P',
          fontSize: 'clamp(10px, 0.8vw, 16px)',
          cursor: 'pointer',
          zIndex: 10000,
          boxShadow: '0 0 10px rgba(155, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span>⚠️</span>
        <span>SUMMON MONSTER</span>
      </motion.button>

      {/* Fixed Dark Mode Toggle */}
      <div
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: '8vh',
          right: '94vw',
          width: 'clamp(40px, 5vw, 50px)',
          height: 'clamp(30px, 2vh, 40px)',
          background: isDarkMode ? '#2d2d2d' : '#f2aeb9',
          borderRadius: '15px',
          cursor: 'pointer',
          zIndex: 10000,
          transition: 'all 0.3s ease',
          border: '2px solid var(--text-color)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div
          style={{ 
            position: 'absolute',
            top: '2px',
            left: isDarkMode ? 'calc(100% - 26px)' : '2px',
            width: 'clamp(16px, 1.5vw, 24px)',
            height: 'clamp(16px, 1.5vw, 24px)',
            background: isDarkMode ? '#f2aeb9' : '#2d2d2d',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(10px, 1vw, 12px)'
          }}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </div>
      </div>

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
          <small style={{ fontSize: 'clamp(12px, 1vw, 16px)', color: '#ccc' }}>
          Shake the mouse if you're curious...
        </small>
      </h1>
      
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
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
            gap: '2vw',
            padding: '0 2vw'
          }}
        >
          {/* Left Section - GitHub Window */}
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
              position: 'relative'
            }}
          >
            <LightGreyBox />
          </motion.section>

          {/* Center Section - Main Content */}
          <motion.section
            animate={{
              x: isRearranged ? Math.random() * 150 - 75 : 0,
              y: isRearranged ? Math.random() * 150 - 75 : 0,
              rotate: isRearranged ? Math.random() * 25 - 12.5 : 0
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: '60%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <h2 className="text-3x1 font-bold mb-4">IN DEVELOPMENT ...🏗️</h2>
          </motion.section>

          {/* Right Section - Arcade Game */}
          <motion.section
            animate={{
              x: isRearranged ? Math.random() * 150 - 75 : 0,
              y: isRearranged ? Math.random() * 150 - 75 : 0,
              rotate: isRearranged ? Math.random() * 25 - 12.5 : 0
            }}
            transition={{ duration: 2 }}
            style={{ 
              width: '20%',
              padding: '1vw',
              color: 'var(--text-color)',
            }}
          >
            <ArcadeLauncher />
          </motion.section>
        </motion.div>

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
          <BlackHoleTrap />
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