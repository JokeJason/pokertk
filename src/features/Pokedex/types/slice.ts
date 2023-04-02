import { PokemonProps } from 'features/Pokedex/Pokemon';

export type PokedexState = {
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
  pokemonList: PokemonProps[];
  fetchingRegionPokemonList: boolean;
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
