import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta } from '@storybook/react';

import Pokedex from './Pokedex';
import { initialState as initialPokedexState } from './pokedexSlice';
import { initialState as initialFilterState } from '../Filters/filterSlice';
import { PokedexStateProps } from './types/slice';
import { FilterStateProps } from 'features/Filters/types/slice';

const MockedState = {
  // Copied from Redux DevTools from browser
  pokedex: {
    isLoadingPokemons: false,
    pokemonCardList: [
      {
        id: 1,
        name: 'bulbasaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        types: ['grass', 'poison'],
      },
      {
        id: 2,
        name: 'ivysaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
        types: ['grass', 'poison'],
      },
      {
        id: 3,
        name: 'venusaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
        types: ['grass', 'poison'],
      },
      {
        id: 4,
        name: 'charmander',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
        types: ['fire'],
      },
      {
        id: 5,
        name: 'charmeleon',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg',
        types: ['fire'],
      },
      {
        id: 6,
        name: 'charizard',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
        types: ['fire', 'flying'],
      },
      {
        id: 7,
        name: 'squirtle',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
        types: ['water'],
      },
    ],
  },
  filter: {
    regionOptions: [],
    typeOptions: [],
    sortOptions: [],
    selectedRegion: 'kanto',
    selectedType: 'All Types',
    selectedSort: 'id',
    searchInput: '',
  },
};

interface MockStoreProps {
  pokedexState: PokedexStateProps;
  filterState: FilterStateProps;
  children: React.ReactNode;
}

// Create a mock store
const mockPokedexSlice = (pokedexState: PokedexStateProps) => {
  return createSlice({
    name: 'pokedex',
    initialState: pokedexState,
    reducers: {},
  });
};
const mockFilterSlice = (filterState: FilterStateProps) => {
  return createSlice({
    name: 'filter',
    initialState: filterState,
    reducers: {},
  });
};
const mockStore = (
  pokedexState: PokedexStateProps,
  filterState: FilterStateProps,
) => {
  return configureStore({
    reducer: {
      filter: mockFilterSlice(filterState).reducer,
      pokedex: mockPokedexSlice(pokedexState).reducer,
    },
  });
};
const Mockstore: React.FC<MockStoreProps> = ({
  pokedexState,
  filterState,
  children,
}) => (
  <Provider store={mockStore(pokedexState, filterState)}>{children}</Provider>
);

const meta: Meta<typeof Pokedex> = {
  component: Pokedex,
  title: 'features/Pokedex',
  decorators: [
    (story: () => React.ReactNode) => (
      <div style={{ padding: '3rem' }}>{story()}</div>
    ),
  ],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export default meta;

export const Loding = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore
        pokedexState={initialPokedexState}
        filterState={initialFilterState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const All = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore
        pokedexState={MockedState.pokedex}
        filterState={MockedState.filter}
      >
        {story()}
      </Mockstore>
    ),
  ],
  args: {
    selectedRegion: 'kanto',
  },
};

const filterStateOnlyFire = {
  regionOptions: [],
  typeOptions: [],
  sortOptions: [],
  selectedRegion: 'kanto',
  selectedType: 'fire',
  selectedSort: 'id',
  searchInput: '',
};
export const typeFireSelected = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore
        pokedexState={MockedState.pokedex}
        filterState={filterStateOnlyFire}
      >
        {story()}
      </Mockstore>
    ),
  ],
  args: {
    selectedRegion: 'kanto',
  },
};
