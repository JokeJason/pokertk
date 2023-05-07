import { PokemonResponseData } from './api';
import { PokemonCardProps } from 'components/PokemonCard';

export type PokedexState = {
  regionOptions: RegionPokemonRange[];
  typeOptions: string[];
  sortOptions: { name: string; value: string }[];
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
  searchInput: string;
  isLoadingPokemons: boolean;
  pokemonCardList: PokemonCardProps[];
};

export type RegionPokemonRange = {
  region: string;
  startId: number;
  endId: number;
};
