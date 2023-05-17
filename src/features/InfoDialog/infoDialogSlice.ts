import { createSlice } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';
import { buildDevCheckHandler } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/devMiddleware';
import { useAppSelector } from '../../app/hooks';
import { pokeApi } from '../../app/services/pokeApi';
import { PokemonResponseData } from '../../types/api';

export type InfoDialogStateProps = {
  isOpen: boolean;
  skipGetPokemonSpeciesQuery: boolean;
  skipGetEvolutionChainQuery: boolean;
  selectedPokemonId: number;
  pokemonSpeciesIdToFetch: number;
  evolutionChainIdToFetch: number;
};

export const initialState: InfoDialogStateProps = {
  isOpen: false,
  skipGetPokemonSpeciesQuery: false,
  skipGetEvolutionChainQuery: false,
  selectedPokemonId: 0,
  pokemonSpeciesIdToFetch: 0,
  evolutionChainIdToFetch: 0,
};

export const infoDialogSlice: Slice<InfoDialogStateProps> = createSlice({
  name: 'infoDialog',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setSkipGetPokemonSpeciesQuery: (state, action: PayloadAction<boolean>) => {
      state.skipGetPokemonSpeciesQuery = action.payload;
    },
    setSkipGetEvolutionChainQuery: (state, action: PayloadAction<boolean>) => {
      state.skipGetEvolutionChainQuery = action.payload;
    },
    setSelectedPokemonId: (state, action: PayloadAction<number>) => {
      state.selectedPokemonId = action.payload;
    },
    setPokemonSpeciesIdToFetch: (state, action: PayloadAction<number>) => {
      state.pokemonSpeciesIdToFetch = action.payload;
    },
    setEvolutionChainIdToFetch: (state, action: PayloadAction<number>) => {
      state.evolutionChainIdToFetch = action.payload;
    },
  },
});

export const {
  setIsOpen,
  setSkipGetPokemonSpeciesQuery,
  setSkipGetEvolutionChainQuery,
  setSelectedPokemonId,
  setPokemonSpeciesIdToFetch,
  setEvolutionChainIdToFetch,
} = infoDialogSlice.actions;

export default infoDialogSlice.reducer;

const fetchSelectedPokemonInfo = () => async (dispatch: any, getState: any) => {
  dispatch(setIsOpen(true));
  const selectedPokemonId = getState().InfoDialog.selectedPokemonId;
  const { data: selectedPokemon } =
    pokeApi.useGetPokemonQuery(selectedPokemonId);
};
