import './retro.css'; // Import retro style

import WavyBlob from './components/WavyBlob';
import WigglyWorm from './components/WigglyWorm';
import LightGreyBox from './components/LightGreyBox';
import BlackHoleTrap from './components/BlackHoleTrap';
import ArcadeLauncher from './components/ArcadeLauncher';
import RunnerCharacter from './components/RunnerCharacter';

function App() {
  return (
    <div className="App">
      {/* Name Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: '#f2aeb9',
        color: '#000000',
        fontFamily: 'Press Start 2P',
        fontSize: '1.2vw',
        padding: '1vw',
        textAlign: 'center',
        borderBottom: '0.5vw double rgb(0, 0, 0)',
        zIndex: 1001
      }}>
        ubadahme@gmail.com
      </header>

      {/* Main Content Container */}
      <div className="main-content" style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '5vw',
        paddingLeft: '2vw',
        paddingRight: '2vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Welcome Title */}
        <h1 style={{ 
          textAlign: 'center', 
          marginTop: '2vw',
          marginBottom: '4vw',
          fontSize: '2.8vw',
          zIndex: 1,
          position: 'relative'
        }}>
          <span style={{ color: '#FFD700' }}>Welcome to Botfolio 🧠</span>
          <br />
          <small style={{ fontSize: '1vw', color: '#ccc' }}>
            Shake the mouse if you're curious...
          </small>
        </h1>

        {/* Content Sections */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Section */}
          <section style={{ 
            width: '30%',
            padding: '1vw',
            color: '#000000',
          }}>
            <h2 className="text-3x1 font-bold mb-4">IN DEVELOPMENT ...🏗️</h2>
          </section>

          {/* Center Section */}
          <section style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            <LightGreyBox />
          </section>

          {/* Right Section */}
          <section style={{
            width: '30%',
            position: 'relative'
          }}>
            <ArcadeLauncher />
          </section>
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
          <BlackHoleTrap />
        </div>
      </div>
      
      {/* Retro-style Status Bar */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#306230',
        color: '#9bbc0f',
        fontFamily: 'Press Start 2P',
        fontSize: '0.8vw',
        padding: '0.5vw',
        textAlign: 'center',
        borderTop: '0.2vw double #9bbc0f',
        zIndex: 1001
      }}>
        STATUS: READY 🕹️ | FPS: 60 | PRESS 🐁 TO SHAKE THE MATRIX
      </footer>
    </div>
  );
}

export default App;
