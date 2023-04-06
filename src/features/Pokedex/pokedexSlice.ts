import { createSlice } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { startAppListening } from 'app/listenerMiddleware';
import { PokedexState, RegionPokemonRange } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';
import { pokedexApi } from './pokedexApi';

const data: RegionPokemonRange[] = [
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
pokedexApi.endpoints.getTypeList.initiate();

const initialState: PokedexState = {
  selectedRegion: '',
  regionPokemonIdsList: data,
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
