import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokedexState } from 'features/Pokedex/types/slice';
import type { RootState } from 'app/store';
import { nameUrlPair } from './types/api';

const initialState: PokedexState = {
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
  pokemonList: [],
  fetchingRegionPokemonList: false,
};

export const pokedexSlice = createSlice({
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
    setFetchingRegionPokemonList: (state, action: PayloadAction<boolean>) => {
      state.fetchingRegionPokemonList = action.payload;
    },
  },
});

export const {
  setSelectedRegion,
  setSelectedType,
  setSelectedSort,
  setFetchingRegionPokemonList,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
