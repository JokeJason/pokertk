import React from 'react';

import { Tooltip, Zoom } from '@mui/material';

import * as pokeTypeAsset from 'assets/types';
import './PokemonTypes.css';

export const findPokeTypeAsset = (pokeType: string) => {
  switch (pokeType) {
    case 'normal':
      return pokeTypeAsset.pokeType_normal;
    case 'fire':
      return pokeTypeAsset.pokeType_fire;
    case 'water':
      return pokeTypeAsset.pokeType_water;
    case 'electric':
      return pokeTypeAsset.pokeType_electric;
    case 'grass':
      return pokeTypeAsset.pokeType_grass;
    case 'ice':
      return pokeTypeAsset.pokeType_ice;
    case 'fighting':
      return pokeTypeAsset.pokeType_fighting;
    case 'poison':
      return pokeTypeAsset.pokeType_poison;
    case 'ground':
      return pokeTypeAsset.pokeType_ground;
    case 'flying':
      return pokeTypeAsset.pokeType_flying;
    case 'psychic':
      return pokeTypeAsset.pokeType_psychic;
    case 'bug':
      return pokeTypeAsset.pokeType_bug;
    case 'rock':
      return pokeTypeAsset.pokeType_rock;
    case 'ghost':
      return pokeTypeAsset.pokeType_ghost;
    case 'dragon':
      return pokeTypeAsset.pokeType_dragon;
    case 'dark':
      return pokeTypeAsset.pokeType_dark;
    case 'steel':
      return pokeTypeAsset.pokeType_steel;
    case 'fairy':
      return pokeTypeAsset.pokeType_fairy;
    default:
      return pokeTypeAsset.pokeType_normal;
  }
};

export interface PokemonTypesProps {
  types: string[];
}

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    // css is set in consumer
    <>
      {types.map(type => (
        <Tooltip title={type} key={type} TransitionComponent={Zoom} arrow>
          <div className={`poke__type__bg ${type}`}>
            <img src={findPokeTypeAsset(type)} alt={type} />
          </div>
        </Tooltip>
      ))}
    </>
  );
};

export default PokemonTypes;
