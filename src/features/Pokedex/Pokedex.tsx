import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';
import { useGetRegionListQuery, useGetTypeListQuery } from './pokedexApi';
import Loading from 'components/Loading';

import charizard from 'features/Pokedex/Pokemon/assets/stories/charizard.svg';

const Pokedex = () => {
  const { isLoading: isLoadingRegionList } = useGetRegionListQuery();
  const { isLoading: isLoadingTypeList } = useGetTypeListQuery();

  return (
    <>
      <Filters />
      {isLoadingRegionList && isLoadingTypeList ? (
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
