import React from 'react';
import WigglyWorm from './components/WigglyWorm';

function App() {
  return (
    <div className="App">
      <WigglyWorm />
      <h1 style={{ textAlign: 'center', marginTop: '50vh' }}>
        Welcome to Botfolio 🧠<br />
        <small>Shake the mouse if you're curious...</small>
      </h1>
    </div>
  );
}

export default App;
