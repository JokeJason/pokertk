import React from 'react';
import './App.css';
import Header from 'components/Header/Header';
import Pokedex from 'features/Pokedex';
import Filters from 'features/Filters';
import InfoDialog from 'features/InfoDialog';
import { useAppSelector } from 'app/hooks';

function App() {
  const selectedRegion = useAppSelector(state => state.filter.selectedRegion);

  return (
    <div className="App app_container">
      <Header />
      <Filters />
      <Pokedex selectedRegion={selectedRegion} />
      <InfoDialog />
    </div>
  );
}

export default App;
