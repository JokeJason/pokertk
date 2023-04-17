import { PokemonResponseData } from './api';
import { PokemonCardProps } from '../PokemonCard';

export type PokedexState = {
  selectedRegion: string;
  regionOptions: RegionPokemonRange[];
  selectedType: string;
  typeOptions: string[];
  selectedSort: string;
  sortOptions: { name: string; value: string }[];
  isLoadingPokemons: boolean;
  pokemonCardList: PokemonCardProps[];
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
