import React from 'react';
import WigglyWorm from './components/WigglyWorm';
import WavyBlob from './components/WavyBlob';

function App() {
  return (
    <div className="App">
      <WavyBlob />
      <WigglyWorm />
      <h1 style={{ textAlign: 'center', marginTop: '50vh' }}>
        Welcome to Botfolio 🧠<br />
        <small>Shake the mouse if you're curious...</small>
      </h1>
    </div>
  );
}

export default App;
