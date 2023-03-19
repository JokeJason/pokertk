import React from 'react';
import './App.css';
import Header from 'components/Header';
import Filters from 'components/Filters';
import { Pokedex } from './features/Pokedex/Pokedex';

function App() {
  return (
    <div className="App app_container">
      <Header />
      <Filters />
      <Pokedex />
    </div>
  );
}

export default App;
