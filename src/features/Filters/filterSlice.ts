import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { FilterState } from './types/slice';
import { RegionPokemonRange } from './types/slice';
import { filterApi } from './filterApi';

filterApi.endpoints.getTypeList.initiate(); // initialize type list fetching

const initialState: FilterState = {
  regionOptions: [],
  typeOptions: [],
  sortOptions: [],
  selectedRegion: '',
  selectedType: '',
  selectedSort: '',
  searchInput: '',
};

export const filterSlice: Slice<FilterState> = createSlice({
  name: 'filter',
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
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      filterApi.endpoints.getTypeList.matchFulfilled,
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
