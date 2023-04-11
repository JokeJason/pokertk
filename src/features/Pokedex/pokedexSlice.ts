import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { PokedexState, RegionPokemonRange } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';
import { pokedexApi } from './pokedexApi';
import { RootState } from '../../app/store';

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

export const fetchPokemonsInTheRegion = createAsyncThunk<
  PokemonResponseData[],
  string,
  { state: RootState }
>('pokedex/setSelectedRegion', async (region: string, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const regionOptions = getState().pokedex.regionOptions;

  const { startId, endId } = getStartAndEndIdsForRegion(region, regionOptions);
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
});

const initialState: PokedexState = {
  regionOptions: regionPokemonRange,
  typeOptions: [],
  sortOptions: sortOptions,
  selectedRegion: '',
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
      state.regionOptions = action.payload;
    },
    setIsLoadingPokemons: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPokemons = action.payload;
    },
    setPokemonList: (state, action: PayloadAction<PokemonResponseData[]>) => {
      state.pokemonList = action.payload;
    },
    setTypeList: (state, action: PayloadAction<string[]>) => {
      state.typeOptions = action.payload;
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
          state.typeOptions = regionListResults.map(region => region.name);

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
