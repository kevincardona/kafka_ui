import React from 'react';
import './App.css';
import {Producer} from './components/Producer.js'
import {History} from './components/History.js'

function App() {
  return (
    <div className="App">
      <Producer></Producer>
      <History></History>
    </div>
  );
}

export default App;
