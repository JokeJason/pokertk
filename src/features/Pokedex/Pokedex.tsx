import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';
import { useGetPokemonListQuery } from './pokedexApi';
import Loading from 'components/Loading';

import charizard from 'features/Pokedex/Pokemon/assets/stories/charizard.svg';

const Pokedex = () => {
  const { data, error, isLoading } = useGetPokemonListQuery(100);

  return (
    <>
      <Filters />
      {isLoading ? (
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
