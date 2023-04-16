import React from 'react';
import PokemonCard from './PokemonCard';
import Filters from './Filters';
import Loading from 'components/Loading';

import { useAppSelector } from 'app/hooks';
import { PokemonResponseData } from './types/api';

export const filterPokemonByType = (
  pokemonList: PokemonResponseData[],
  selectedType: string,
) => {
  return pokemonList.filter(
    pokemon =>
      selectedType === 'All Types' ||
      pokemon.types.some(type => type.type.name === selectedType),
  );
};

export const sortPokemonsByIdOrName = (
  pokemonList: PokemonResponseData[],
  selectedSort: string,
) => {
  return pokemonList.sort((a, b) => {
    if (selectedSort === 'id') {
      return a.id - b.id;
    } else if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });
};

const Pokedex = () => {
  const isLoadingPokemons = useAppSelector(
    state => state.pokedex.isLoadingPokemons,
  );
  const selectedType = useAppSelector(state => state.pokedex.selectedType);
  const selectedSort = useAppSelector(state => state.pokedex.selectedSort);

  const pokemonList = useAppSelector(state => state.pokedex.pokemonList);

  const filteredPokemonList = filterPokemonByType(pokemonList, selectedType);
  const sortedFilteredPokemonList = sortPokemonsByIdOrName(
    filteredPokemonList,
    selectedSort,
  );

  return (
    <>
      <Filters />
      {isLoadingPokemons ? (
        <Loading />
      ) : (
        sortedFilteredPokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            types={pokemon.types.map(type => type.type.name)}
          />
        ))
      )}
    </>
  );
};

export default Pokedex;
