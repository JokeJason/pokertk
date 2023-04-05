import { createSlice, Slice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { startAppListening } from 'app/listenerMiddleware';
import { PokedexState, RegionPokemonRange } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';

const initialState: PokedexState = {
  selectedRegion: '',
  regionPokemonIdsList: [],
  selectedType: '',
  selectedSort: '',
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
  },
});

export const {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setRegionPokemonIdsList,
  setIsLoadingPokemons,
  setPokemonList,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
