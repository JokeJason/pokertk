import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PokedexStateProps } from 'features/Pokedex/types/slice';

import { getStartAndEndIdsForRegion } from './utils';
import { PokemonResponseData } from 'types/api';
import { pokeRestApi } from 'app/services/pokeRestApi';
import { RootState } from 'app/store';
import { PokemonCardProps } from 'components/PokemonCard';

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

  const pokemonList = pokemonIds.map(id =>
    dispatch(pokeRestApi.endpoints.getPokemon.initiate(id))
      .unwrap()
      .then(data => data),
  );

  return await Promise.all(pokemonList);
});

export const initialState: PokedexStateProps = {
  isLoadingPokemons: true,
  pokemonCardList: [],
};

export const pokedexSlice: Slice<PokedexStateProps> = createSlice({
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

/// selectors
export const filterPokemonCardsByType = (
  pokemonList: PokemonCardProps[],
  selectedType: string,
) => {
  return pokemonList.filter(
    pokemon =>
      selectedType === 'All Types' ||
      pokemon.types.some(type => type === selectedType),
  );
};

export const sortPokemonCardsByIdOrName = (
  pokemonList: PokemonCardProps[],
  selectedSort: string,
) => {
  return pokemonList.sort((a, b) => {
    if (selectedSort === 'id') {
      return a.id - b.id;
    } else if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });
};

export const searchPokemonCardsByName = (
  pokemonList: PokemonCardProps[],
  searchInput: string,
) => {
  return pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase()),
  );
};

export const filteredPokemonListByType = (state: RootState) =>
  filterPokemonCardsByType(
    state.pokedex.pokemonCardList,
    state.filter.selectedType,
  );

export const sortedFilteredPokemonCardList = (state: RootState) =>
  sortPokemonCardsByIdOrName(
    filteredPokemonListByType(state),
    state.filter.selectedSort,
  );

export const searchedSortedFilteredPokemonCardList = (state: RootState) =>
  searchPokemonCardsByName(
    sortedFilteredPokemonCardList(state),
    state.filter.searchInput,
  );
