import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { FilterState } from './types/slice';
import { RegionPokemonRange } from './types/slice';
import { pokeApi } from 'app/services/pokeApi';
import { fetchPokemonsInTheRegion } from 'features/Pokedex/pokedexSlice';

const initialState: FilterState = {
  regionOptions: [],
  typeOptions: [],
  sortOptions: [],
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
  searchInput: '',
};

export const initializeFilterSlice = createAsyncThunk(
  'filter/initializeFilterSlice',
  async (_args, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    const regionOptions = [
      { region: 'kanto', startId: 1, endId: 151 },
      { region: 'johto', startId: 152, endId: 251 },
      { region: 'hoenn', startId: 252, endId: 386 },
      { region: 'sinnoh', startId: 387, endId: 493 },
      { region: 'unova', startId: 494, endId: 649 },
      { region: 'kalos', startId: 650, endId: 721 },
      { region: 'alola', startId: 722, endId: 809 },
      { region: 'galar', startId: 810, endId: 898 },
    ];

    dispatch(pokeApi.endpoints.getTypeList.initiate());

    const sortOptions = [
      { name: 'ID', value: 'id' },
      { name: 'Name', value: 'name' },
    ];

    return { regionOptions, sortOptions };
  },
);

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      fetchPokemonsInTheRegion(state.selectedRegion);
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
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeFilterSlice.fulfilled, (state, action) => {
      if (action.payload) {
        state.regionOptions = action.payload.regionOptions;
        state.sortOptions = action.payload.sortOptions;

        state.selectedRegion = action.payload.regionOptions[0].region;
        state.selectedSort = action.payload.sortOptions[0].value;
      }
    });
    builder.addMatcher(
      pokeApi.endpoints.getTypeList.matchFulfilled,
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
  setSearchInput,
} = filterSlice.actions;

export default filterSlice.reducer;
