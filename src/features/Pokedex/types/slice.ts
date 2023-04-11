import { PokemonResponseData } from './api';

export type PokedexState = {
  selectedRegion: string;
  regionOptions: RegionPokemonRange[];
  selectedType: string;
  typeOptions: string[];
  selectedSort: string;
  sortOptions: { name: string; value: string }[];
  isLoadingPokemons: boolean;
  pokemonList: PokemonResponseData[];
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
