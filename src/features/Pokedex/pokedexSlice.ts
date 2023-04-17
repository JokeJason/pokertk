import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { PokedexState, RegionPokemonRange } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';
import { pokedexApi } from './pokedexApi';
import { RootState } from '../../app/store';

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
  // use pokemonIds to fetch pokemon data using fetch, remember to clear all fetched cache after saving data into store
  const pokemonList = await Promise.all(
    pokemonIds.map(
      id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
          res.json(),
        ) as Promise<PokemonResponseData>,
    ),
  );

  const pokemonListData = pokemonList.map(
    (pokemon: PokemonResponseData) => pokemon,
  );

  // TODO: Fix this cache clearing, as running it cause proble in browser console
  // clear all fetched data cache
  // pokemonIds.forEach(id => {
  //   const cacheKey = `https://pokeapi.co/api/v2/pokemon/${id}`;
  //   delete (window as any).fetch.cache[cacheKey];
  // });

  return pokemonListData;
});

const initialState: PokedexState = {
  regionOptions: [],
  typeOptions: [],
  sortOptions: [],
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
  isLoadingPokemons: true,
  pokemonCardList: [],
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
    setRegionOptions: (state, action: PayloadAction<RegionPokemonRange[]>) => {
      state.regionOptions = action.payload;
    },
    setTypeOptions: (state, action: PayloadAction<string[]>) => {
      state.typeOptions = action.payload;
    },
    setSortOptions: (
      state,
      action: PayloadAction<{ name: string; value: string }[]>,
    ) => {
      state.sortOptions = action.payload;
    },
    setIsLoadingPokemons: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPokemons = action.payload;
    },
  },
  extraReducers: builder => {
    // add fetchPokemonsInTheRegion
    builder.addCase(fetchPokemonsInTheRegion.fulfilled, (state, action) => {
      state.isLoadingPokemons = false;
      // set action payload to pokemonCardList by transforming payload
      state.pokemonCardList = action.payload.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types.map(type => type.type.name),
      }));
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
  setRegionOptions,
  setTypeOptions,
  setSortOptions,
} = pokedexSlice.actions;

export default pokedexSlice.reducer;
