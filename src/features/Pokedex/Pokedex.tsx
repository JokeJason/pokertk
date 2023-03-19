import React from 'react';
import { Pokemon } from './Pokemon';

import charizard from 'assets/charizard.svg';

export function Pokedex() {
  return <Pokemon name={'Charizard'} number={'#006'} image={charizard} />;
}
