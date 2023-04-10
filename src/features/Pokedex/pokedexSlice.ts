import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { startAppListening } from 'app/listenerMiddleware';
import { PokedexState, RegionPokemonRange } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';
import { pokedexApi } from './pokedexApi';

const regionPokemonRange: RegionPokemonRange[] = [
  { region: 'kanto', startId: 1, endId: 151 },
  { region: 'johto', startId: 152, endId: 251 },
  { region: 'hoenn', startId: 252, endId: 386 },
  { region: 'sinnoh', startId: 387, endId: 493 },
  { region: 'unova', startId: 494, endId: 649 },
  { region: 'kalos', startId: 650, endId: 721 },
  { region: 'alola', startId: 722, endId: 809 },
  { region: 'galar', startId: 810, endId: 898 },
];
const sortOptions = [
  { name: 'ID', value: 'id' },
  { name: 'Name', value: 'name' },
];
pokedexApi.endpoints.getTypeList.initiate(); // initialize type list fetching
// typesData will be used in Filters.tsx

export const fetchPokemonsInTheRegion = createAsyncThunk(
  'pokedex/setSelectedRegion',
  async (region: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { startId, endId } = getStartAndEndIdsForRegion(
      region,
      regionPokemonRange,
    );
    const pokemonIds = Array.from(
      { length: endId - startId + 1 },
      (_, i) => i + startId,
    );
    // use pokemonIds to fetch pokemon data using getPokemonQuery and store in state
    const pokemonList = await Promise.all(
      pokemonIds.map(
        id =>
          dispatch(pokedexApi.endpoints.getPokemon.initiate(id)) as Promise<{
            data: PokemonResponseData;
          }>,
      ),
    );
    const pokemonListData = pokemonList.map(
      (pokemon: { data: PokemonResponseData }) => pokemon.data,
    );
    return pokemonListData;
  },
);

const initialState: PokedexState = {
  selectedRegion: '',
  regionPokemonIdsList: regionPokemonRange,
  selectedType: '',
  typeList: [],
  selectedSort: '',
  sortList: sortOptions,
  isLoadingPokemons: true,
  pokemonList: [],
};

export const pokedexSlice: Slice<PokedexState> = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      // call fetchPokemonsInTheRegion
      fetchPokemonsInTheRegion(action.payload);
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    setRegionPokemonIdsList: (
      state,
      action: PayloadAction<RegionPokemonRange[]>,
    ) => {
      state.regionPokemonIdsList = action.payload;
    },
    setIsLoadingPokemons: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPokemons = action.payload;
    },
    setPokemonList: (state, action: PayloadAction<PokemonResponseData[]>) => {
      state.pokemonList = action.payload;
    },
    setTypeList: (state, action: PayloadAction<string[]>) => {
      state.typeList = action.payload;
    },
  },
  extraReducers: builder => {
    // add fetchPokemonsInTheRegion
    builder.addCase(fetchPokemonsInTheRegion.fulfilled, (state, action) => {
      state.isLoadingPokemons = false;
      state.pokemonList = action.payload;
    });
    builder.addMatcher(
      pokedexApi.endpoints.getTypeList.matchFulfilled,
      (state, action) => {
        if (action.payload && action.payload.results.length > 0) {
          const regionListResults = action.payload.results;
          state.typeList = regionListResults.map(region => region.name);

          state.selectedType = action.payload.results[0].name;
        }
      },
    );
  },
});

export const {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setIsLoadingPokemons,
  setPokemonList,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;

// Use second option of organizing listeners method in RTK doc
startAppListening({
  actionCreator: setSelectedRegion,
  effect: async (action, { dispatch, getState }) => {
    const selectedRegion = getState().pokedex.selectedRegion;
    const regionPokemonList = getState().pokedex.regionPokemonIdsList;
    console.log('regionPokemonList', regionPokemonList);
    const { startId, endId } = getStartAndEndIdsForRegion(
      selectedRegion,
      regionPokemonList,
    );
    console.log('startId', startId);
    console.log('endId', endId);
    const pokemonIdsToFetch = Array.from(
      { length: endId - startId + 1 },
      (_, i) => i + startId,
    );
    console.log('pokemonIdsToFetch', pokemonIdsToFetch);

    dispatch(setIsLoadingPokemons(true));
  },
});
