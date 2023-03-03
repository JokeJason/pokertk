import React from 'react';
import './App.css';
import { Header } from './Header';
import { Filters } from './Filters';

function App() {
  return (
    <div className="App app_container">
      <Header />
      <Filters />
    </div>
  );
}

export default App;
