import React from 'react';
import './App.css';
import Header from 'components/Header';
import Filters from 'components/Filters';
import { Pokemon } from 'features/Pokedex/Pokemon';

function App() {
  return (
    <div className="App app_container">
      <Header />
      <Filters />
      <Pokemon />
    </div>
  );
}

export default App;
