import {
  filterPokemonCardsByType,
  sortPokemonCardsByIdOrName,
  searchPokemonCardsByName,
} from 'features/Pokedex/Pokedex';
import { PokemonCardProps } from 'components/PokemonCard';
import pokemon3_venusaur_card from 'features/Pokedex/__test__/pokemon3_venusaur_Card.json';
import pokemon4_charmander_card from 'features/Pokedex/__test__/pokemon4_charmandar_Card.json';
import { AppStore } from 'app/store';
import { configureStore } from '@reduxjs/toolkit';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { filterSlice } from 'features/Filters/filterSlice';
import { pokeRestApi } from 'app/services/pokeRestApi';

let store: AppStore;

describe('pokedex Component', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokedex: pokedexSlice.reducer,
        filter: filterSlice.reducer,
        [pokeRestApi.reducerPath]: pokeRestApi.reducer,
      },
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(pokeRestApi.middleware),
    });
  });

  describe('filterPokemonByType works correctly', () => {
    const pokemonList: PokemonCardProps[] = [
      pokemon3_venusaur_card,
      pokemon4_charmander_card,
    ];

    it('should return all PokemonCard if the selected type is "All Types"', () => {
      const selectedType = 'All Types';
      const filteredList = filterPokemonCardsByType(pokemonList, selectedType);
      expect(filteredList).toEqual(pokemonList);
    });

    it('should return only PokemonCard of the selected type', () => {
      const selectedType = 'fire';
      const filteredList = filterPokemonCardsByType(pokemonList, selectedType);
      const allPokemonAreOfTypeFire = filteredList.every(pokemon =>
        pokemon.types.some(type => type === selectedType),
      );
      expect(allPokemonAreOfTypeFire).toBe(true);
    });
  });

  describe('sortPokemonsByIdOrName works correctly', () => {
    const pokemonList: PokemonCardProps[] = [
      pokemon3_venusaur_card,
      pokemon4_charmander_card,
    ];
    it('should sort by id if the selected sort is "id"', () => {
      const selectedSort = 'id';
      const sortedList = sortPokemonCardsByIdOrName(pokemonList, selectedSort);
      expect(sortedList).toEqual([
        pokemon3_venusaur_card,
        pokemon4_charmander_card,
      ]);
    });

    it('should sort by name if the selected sort is "name"', () => {
      const selectedSort = 'name';
      const sortedList = sortPokemonCardsByIdOrName(pokemonList, selectedSort);
      expect(sortedList).toEqual([
        pokemon4_charmander_card,
        pokemon3_venusaur_card,
      ]);
    });
  });

  describe('searchPokemonByName works correctly', () => {
    const pokemonList: PokemonCardProps[] = [
      pokemon3_venusaur_card,
      pokemon4_charmander_card,
    ];

    it('should search by name correctly', () => {
      const searchName = 'char';
      const searchedList = searchPokemonCardsByName(pokemonList, searchName);
      expect(searchedList).toHaveLength(1);
      expect(searchedList[0]).toEqual(pokemon4_charmander_card);
    });
  });
});
