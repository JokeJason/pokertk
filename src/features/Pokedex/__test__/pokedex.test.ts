import {
  filterPokemonCardsByType,
  sortPokemonCardsByIdOrName,
  searchPokemonCardsByName,
} from 'features/Pokedex/Pokedex';
import { PokemonResponseData } from 'features/Pokedex/types/api';
import pokemon3_Venusaur from 'features/Pokedex/__test__/pokemon3_Venusaur.json';
import pokemon4_Charmander from 'features/Pokedex/__test__/pokemon4_charmander.json';
import { AppStore } from 'app/store';
import { configureStore } from '@reduxjs/toolkit';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { pokedexApi } from 'features/Pokedex/pokedexApi';
import { listenerMiddleware } from 'app/listenerMiddleware';

let store: AppStore;

describe('pokedex Component', () => {
  describe('filterPokemonByType works correctly', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          pokedex: pokedexSlice.reducer,
          [pokedexApi.reducerPath]: pokedexApi.reducer,
        },
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware().concat(
            pokedexApi.middleware,
            listenerMiddleware.middleware,
          ),
      });
    });

    const pokemonList: PokemonResponseData[] = [
      pokemon3_Venusaur,
      pokemon4_Charmander,
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
        pokemon.types.some(type => type.type.name === selectedType),
      );
      expect(allPokemonAreOfTypeFire).toBe(true);
    });
  });

  describe('sortPokemonsByIdOrName works correctly', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          pokedex: pokedexSlice.reducer,
          [pokedexApi.reducerPath]: pokedexApi.reducer,
        },
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware().concat(
            pokedexApi.middleware,
            listenerMiddleware.middleware,
          ),
      });
    });

    const pokemonList: PokemonResponseData[] = [
      pokemon3_Venusaur,
      pokemon4_Charmander,
    ];
    it('should sort by id if the selected sort is "id"', () => {
      const selectedSort = 'id';
      const sortedList = sortPokemonCardsByIdOrName(pokemonList, selectedSort);
      expect(sortedList).toEqual([pokemon3_Venusaur, pokemon4_Charmander]);
    });

    it('should sort by name if the selected sort is "name"', () => {
      const selectedSort = 'name';
      const sortedList = sortPokemonCardsByIdOrName(pokemonList, selectedSort);
      expect(sortedList).toEqual([pokemon4_Charmander, pokemon3_Venusaur]);
    });
  });

  describe('searchPokemonByName works correctly', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          pokedex: pokedexSlice.reducer,
          [pokedexApi.reducerPath]: pokedexApi.reducer,
        },
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware().concat(
            pokedexApi.middleware,
            listenerMiddleware.middleware,
          ),
      });
    });

    const pokemonList: PokemonResponseData[] = [
      pokemon3_Venusaur,
      pokemon4_Charmander,
    ];

    it('should search by name correctly', () => {
      const searchName = 'char';
      const searchedList = searchPokemonCardsByName(pokemonList, searchName);
      expect(searchedList).toHaveLength(1);
      expect(searchedList[0]).toEqual(pokemon4_Charmander);
    });
  });
});
