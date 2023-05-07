import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Slice, PayloadAction } from '@reduxjs/toolkit';

import { PokedexState } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from './types/api';
import { RootState } from 'app/store';

export const fetchPokemonsInTheRegion = createAsyncThunk<
  PokemonResponseData[],
  string,
  { state: RootState }
>('pokedex/setSelectedRegion', async (region: string, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const regionOptions = getState().filter.regionOptions;

  dispatch(setIsLoadingPokemons(true));

  const { startId, endId } = getStartAndEndIdsForRegion(region, regionOptions);
  const pokemonIds = Array.from(
    { length: endId - startId + 1 },
    (_, i) => i + startId,
  );
  // use pokemonIds to fetch pokemon data using fetch, which won't save the data in the cache
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

  return pokemonListData;
});

const initialState: PokedexState = {
  isLoadingPokemons: true,
  pokemonCardList: [],
};

export const pokedexSlice: Slice<PokedexState> = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
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
        image: pokemon.sprites.other.dream_world.front_default
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(type => type.type.name),
      }));
    });
  },
});

export const { setIsLoadingPokemons } = pokedexSlice.actions;

export default pokedexSlice.reducer;
