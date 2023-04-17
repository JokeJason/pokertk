import React from 'react';
import PokemonCard, { PokemonCardProps } from './PokemonCard';
import Filters from './Filters';
import Loading from 'components/Loading';

import { useAppSelector } from 'app/hooks';

export const filterPokemonCardsByType = (
  pokemonList: PokemonCardProps[],
  selectedType: string,
) => {
  return pokemonList.filter(
    pokemon =>
      selectedType === 'All Types' ||
      pokemon.types.some(type => type === selectedType),
  );
};

export const sortPokemonCardsByIdOrName = (
  pokemonList: PokemonCardProps[],
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

  const pokemonList = useAppSelector(state => state.pokedex.pokemonCardList);

  const filteredPokemonList = filterPokemonCardsByType(
    pokemonList,
    selectedType,
  );
  const sortedFilteredPokemonCardList = sortPokemonCardsByIdOrName(
    filteredPokemonList,
    selectedSort,
  );

  return (
    <>
      <Filters />
      {isLoadingPokemons ? (
        <Loading />
      ) : (
        <div className="all__pokemons">
          {sortedFilteredPokemonCardList.map(pokemonCard => (
            <PokemonCard
              key={pokemonCard.id}
              id={pokemonCard.id}
              name={pokemonCard.name}
              image={pokemonCard.image}
              types={pokemonCard.types}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pokedex;
