import { ListResponse, nameUrlPair } from 'types/api';

export type PokemonListResponseData = ListResponse;

export interface PokemonListItem {
  name: string;
  id: number;
  type: string[];
  image: string;
}

export interface PokemonList {
  PokemonList: PokemonListItem[];
}

export interface RegionResponseData {
  // many fields are ignored
  id: number;
  locations: nameUrlPair[];
  name: string;
}

export interface TypeResponseData {
  // many fields are ignored
  id: number;
  name: string;
}

export interface AbilityItem {
  ability: nameUrlPair;
  is_hidden: boolean;
  slot: number;
}

export interface StatItem {
  base_stat: number;
  effort: number;
  stat: nameUrlPair;
}

export interface typeItem {
  slot: number;
  type: nameUrlPair;
}

export interface PokemonResponseData {
  // many fields are ignored
  abilities: AbilityItem[];
  base_experience: number;
  forms: nameUrlPair[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: nameUrlPair;
  stats: StatItem[];
  types: typeItem[];
  weight: number;
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface LocationResponseData {
  // many fields are ignored
  areas: nameUrlPair[];
  id: number;
  name: string;
  region: nameUrlPair;
}

export interface PokemonEncounter {
  // many fields are ignored
  pokemon: nameUrlPair;
}
export interface AreaResponseData {
  // many fields are ignored
  id: number;
  name: string;
  pokemon_encounters: PokemonEncounter[];
}
