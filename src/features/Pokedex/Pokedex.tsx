import React, { useEffect } from 'react';
import PokemonCard, { PokemonCardProps } from 'components/PokemonCard';
import Loading from 'components/Loading';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { fetchPokemonsInTheRegion } from './pokedexSlice';
import { fetchSelectedPokemonInfo } from 'features/InfoDialog/infoDialogSlice';

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

export const searchPokemonCardsByName = (
  pokemonList: PokemonCardProps[],
  searchInput: string,
) => {
  return pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase()),
  );
};

export interface PokedexProps {
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
  searchInput: string;
}

const Pokedex = ({
  selectedRegion,
  selectedType,
  selectedSort,
  searchInput,
}: PokedexProps) => {
  const dispatch = useAppDispatch();

  const isLoadingPokemons = useAppSelector(
    state => state.pokedex.isLoadingPokemons,
  );
  const pokemonList = useAppSelector(state => state.pokedex.pokemonCardList);

  const filteredPokemonList = filterPokemonCardsByType(
    pokemonList,
    selectedType,
  );
  const sortedFilteredPokemonCardList = sortPokemonCardsByIdOrName(
    filteredPokemonList,
    selectedSort,
  );
  const searchedPokemonCardList = searchPokemonCardsByName(
    sortedFilteredPokemonCardList,
    searchInput,
  );

  useEffect(() => {
    dispatch(fetchPokemonsInTheRegion(selectedRegion));
  }, [selectedRegion]);

  return (
    <>
      {isLoadingPokemons ? (
        <Loading />
      ) : (
        <div className="all__pokemons">
          {searchedPokemonCardList.map(pokemonCard => (
            <PokemonCard
              key={pokemonCard.id}
              id={pokemonCard.id}
              name={pokemonCard.name}
              image={pokemonCard.image}
              types={pokemonCard.types}
              onClickAction={() =>
                dispatch(fetchSelectedPokemonInfo(pokemonCard.id))
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pokedex;
