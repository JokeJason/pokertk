import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';
import Loading from 'components/Loading';

import { useAppSelector } from 'app/hooks';

const Pokedex = () => {
  const isLoadingPokemons = useAppSelector(
    state => state.pokedex.isLoadingPokemons,
  );
  const selectedType = useAppSelector(state => state.pokedex.selectedType);
  const selectedSort = useAppSelector(state => state.pokedex.selectedSort);

  const pokemonList = useAppSelector(state => state.pokedex.pokemonList);

  const filteredPokemonList = pokemonList.filter(pokemon => {
    selectedType === 'All Types' ||
      pokemon.types.some(type => type.type.name === selectedType);
  });

  return (
    <>
      <Filters />
      {isLoadingPokemons ? (
        <Loading />
      ) : (
        filteredPokemonList.map(pokemon => (
          <Pokemon
            key={pokemon.id}
            name={pokemon.name}
            number={pokemon.id}
            image={pokemon.sprites.other.dream_world.front_default}
            types={pokemon.types.map(type => type.type.name)}
          />
        ))
      )}
    </>
  );
};

export default Pokedex;
