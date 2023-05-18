import React from 'react';
import './App.css';
import Header from 'components/Header';
import Pokedex from 'features/Pokedex';
import Filters from 'features/Filters';
import InfoDialog from 'features/InfoDialog';
import { useAppSelector } from 'app/hooks';

function App() {
  const selectedRegion = useAppSelector(state => state.filter.selectedRegion);
  const selectedType = useAppSelector(state => state.filter.selectedType);
  const selectedSort = useAppSelector(state => state.filter.selectedSort);
  const selectedSearchInput = useAppSelector(state => state.filter.searchInput);

  return (
    <div className="App app_container">
      <Header />
      <Filters />
      <Pokedex
        selectedRegion={selectedRegion}
        selectedType={selectedType}
        selectedSort={selectedSort}
        searchInput={selectedSearchInput}
      />
      <InfoDialog />
    </div>
  );
}

export default App;
