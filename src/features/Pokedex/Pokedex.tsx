import React from 'react';
import Pokemon from './Pokemon';
import Filters from './Filters';

import charizard from 'assets/charizard.svg';

const Pokedex = () => {
  return (
    <>
      <Filters />
      <Pokemon name={'Charizard'} number={'#006'} image={charizard} />
    </>
  );
};

export default Pokedex;
