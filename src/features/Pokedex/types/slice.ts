import { PokemonResponseData } from './api';
import { PokemonCardProps } from 'components/PokemonCard';

export type PokedexState = {
  isLoadingPokemons: boolean;
  pokemonCardList: PokemonCardProps[];
};
