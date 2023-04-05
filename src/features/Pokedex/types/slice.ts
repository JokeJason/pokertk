import { PokemonResponseData } from './api';

export type PokedexState = {
  selectedRegion: string;
  regionPokemonIdsList: RegionPokemonRange[];
  selectedType: string;
  selectedSort: string;
  isLoadingPokemons: boolean;
  pokemonList: PokemonResponseData[];
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
