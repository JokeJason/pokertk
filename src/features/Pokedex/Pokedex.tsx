import React, { useEffect } from 'react';
import PokemonCard from 'components/PokemonCard';
import Loading from 'components/Loading';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  fetchPokemonsInTheRegion,
  searchedSortedFilteredPokemonCardList,
} from './pokedexSlice';
import { fetchSelectedPokemonInfo } from 'features/InfoDialog/infoDialogSlice';

export interface PokedexProps {
  selectedRegion: string;
}

const Pokedex = ({ selectedRegion }: PokedexProps) => {
  const dispatch = useAppDispatch();

  const isLoadingPokemons = useAppSelector(
    state => state.pokedex.isLoadingPokemons,
  );
  const pokemonCardListForRendering = searchedSortedFilteredPokemonCardList(
    useAppSelector(state => state),
  );

  useEffect(() => {
    dispatch(fetchPokemonsInTheRegion(selectedRegion));
  }, [dispatch, selectedRegion]);

  return (
    <>
      {isLoadingPokemons ? (
        <Loading />
      ) : (
        <div className="all__pokemons">
          {pokemonCardListForRendering.map(pokemonCard => (
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
