import './retro.css'; // Import retro style

import WavyBlob from './components/WavyBlob';
import WigglyWorm from './components/WigglyWorm';
import LightGreyBox from './components/LightGreyBox';
import BlackHoleTrap from './components/BlackHoleTrap';
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
        fontSize: '16px',
        padding: '12px',
        textAlign: 'center',
        borderBottom: '10px double rgb(0, 0, 0)',
        zIndex: 1001
      }}>
        ubadahme@gmail.com
      </header>
      <BlackHoleTrap />
      <div className="bg-black min-h-screen text-white relative">
        <section
          className="fixed left-0 top-20 w-1/3 p-4 overflow-y-auto"
          style={{ 
            maxHeight: 'calc(100vh - 100px)',
            color: '#f5d402',
            //textAlign: 'left',
            
          }}
        >
          <h2 className="text-3x1 font-bold mb-4">🏗️ IN DEVELOPMENT</h2>
        </section>
      </div>
      <LightGreyBox />
      <RunnerCharacter />
      <WavyBlob />
      <WigglyWorm />
      <h1 style={{ textAlign: 'center', marginTop: '-47vh', marginLeft:'10vh' }}>
        <span style={{ fontSize: '2.8rem', color: '#FFD700' }}>Welcome to Botfolio 🧠</span>
        <br />
        <small style={{ fontSize: '1rem', color: '#ccc' }}>
          Shake the mouse if you're curious...
        </small>
      </h1>
      
      {/* Retro-style Status Bar */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#306230',
        color: '#9bbc0f',
        fontFamily: 'Press Start 2P',
        fontSize: '12px',
        padding: '5px',
        textAlign: 'center',
        borderTop: '4px double #9bbc0f'
      }}>
        STATUS: READY 🕹️ | FPS: 60 | PRESS 🐁 TO SHAKE THE MATRIX
      </footer>
    </div>
  );
}

export default App;
