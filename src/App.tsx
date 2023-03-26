import React from 'react';
import './App.css';
import Header from 'components/Header';
import Pokedex from './features/Pokedex';

function App() {
  return (
    <div className="App app_container">
      <Header />
      <Pokedex />
    </div>
  );
}

export default App;
