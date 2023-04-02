import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonProps } from './Pokemon';
import type { RootState } from 'app/store';
import { nameUrlPair } from './types/api';

interface PokedexState {
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
  pokemonList: PokemonProps[];
  regionPokemonList: nameUrlPair[];
  fetchingRegionPokemonList: boolean;
}

const initialState: PokedexState = {
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
  pokemonList: [],
  regionPokemonList: [],
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
