import { PokemonResponseData } from './api';

export type PokedexState = {
  selectedRegion: string;
  regionPokemonIdsList: RegionPokemonRange[];
  selectedType: string;
  typeList: string[];
  selectedSort: string;
  sortList: { name: string; value: string }[];
  isLoadingPokemons: boolean;
  pokemonList: PokemonResponseData[];
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
