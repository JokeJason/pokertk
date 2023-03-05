import React from 'react';
import './App.css';
import { Header } from './Header';
import { Filters } from './Filters';
import { Pokemon } from './Pokemon';

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
