import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import { PokemonProps as Pokemon } from './Pokemon';

interface PokedexState {
  selectedRegion: string;
  selectedType: string;
  selectedSort: string;
}

const initialState: PokedexState = {
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
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
  },
});

export const { setSelectedRegion, setSelectedType, setSelectedSort } =
  pokedexSlice.actions;

export default pokedexSlice.reducer;
