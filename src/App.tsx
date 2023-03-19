import React from 'react';
import './App.css';
import Header from 'components/Header';
import Filters from './features/Pokedex/Filters/Filters';
import { Pokedex } from './features/Pokedex/Pokedex';
import { useGetPokemonListQuery } from './features/Pokedex/pokedexApi';
import Loading from './components/Loading';

function App() {
  const { data, error, isLoading } = useGetPokemonListQuery(100);
  if (isLoading) {
    return (
      <div className="App app_container">
        <Loading />
      </div>
    );
  }
  return (
    <div className="App app_container">
      <Header />
      <Filters />
      <Pokedex />
    </div>
  );
}

export default App;
