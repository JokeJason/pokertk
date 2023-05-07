import React from 'react';
import './App.css';
import Header from 'components/Header';
import Pokedex from 'features/Pokedex';
import Filters from 'features/Filters';

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
