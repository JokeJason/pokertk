import {
  filterPokemonByType,
  sortPokemonsByIdOrName,
} from 'features/Pokedex/Pokedex';
import { PokemonResponseData } from 'features/Pokedex/types/api';
import pokemon3_Venusaur from 'features/Pokedex/__test__/pokemon3_Venusaur.json';
import pokemon4_Charmander from 'features/Pokedex/__test__/pokemon4_charmander.json';
import { AppDispatch, AppStore } from 'app/store';
import { configureStore, Store } from '@reduxjs/toolkit';
import { pokedexSlice } from 'features/Pokedex/pokedexSlice';
import { pokedexApi } from 'features/Pokedex/pokedexApi';
import { listenerMiddleware } from 'app/listenerMiddleware';

let store: AppStore;
let dispatch: AppDispatch;
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

  it('should return all Pokemon if the selected type is "All Types"', () => {
    const selectedType = 'All Types';
    const filteredList = filterPokemonByType(pokemonList, selectedType);
    expect(filteredList).toEqual(pokemonList);
  });

  it('should return only Pokemon of the selected type', () => {
    const selectedType = 'fire';
    const filteredList = filterPokemonByType(pokemonList, selectedType);
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
    const sortedList = sortPokemonsByIdOrName(pokemonList, selectedSort);
    expect(sortedList).toEqual([pokemon3_Venusaur, pokemon4_Charmander]);
  });

  it('should sort by name if the selected sort is "name"', () => {
    const selectedSort = 'name';
    const sortedList = sortPokemonsByIdOrName(pokemonList, selectedSort);
    expect(sortedList).toEqual([pokemon4_Charmander, pokemon3_Venusaur]);
  });
});
