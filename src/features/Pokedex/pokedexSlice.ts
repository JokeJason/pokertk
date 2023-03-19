import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import { PokemonProps as Pokemon } from './Pokemon';

interface PokedexState {
  pokemonList: Pokemon[];
}

const initialState: PokedexState = {
  pokemonList: [],
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonList = action.payload;
    },
  },
});

export const { setPokemonList } = pokedexSlice.actions;

export default pokedexSlice.reducer;
