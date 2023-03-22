import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';

import charizard from 'features/Pokedex/Pokemon/assets/stories/charizard.svg';

const Pokedex = () => {
  return (
    <>
      <Filters />
      <Pokemon
        name={'Charizard'}
        number={6}
        image={charizard}
        types={['fire', 'flying']}
      />
    </>
  );
};

export default Pokedex;
