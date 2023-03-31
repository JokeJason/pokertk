import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';
import Loading from 'components/Loading';

import charizard from 'features/Pokedex/Pokemon/assets/stories/charizard.svg';
import { useAppSelector } from 'app/hooks';

const Pokedex = () => {
  const isFetchingRegionPokemonList = useAppSelector(
    state => state.pokedex.fetchingRegionPokemonList,
  );
  return (
    <>
      <Filters />
      {isFetchingRegionPokemonList ? (
        <Loading />
      ) : (
        <Pokemon
          name={'Charizard'}
          number={6}
          image={charizard}
          types={['fire', 'flying']}
        />
      )}
    </>
  );
};

export default Pokedex;
