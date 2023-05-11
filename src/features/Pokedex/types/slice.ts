import { PokemonCardProps } from 'components/PokemonCard';

export type PokedexStateProps = {
  isLoadingPokemons: boolean;
  pokemonCardList: PokemonCardProps[];
};
