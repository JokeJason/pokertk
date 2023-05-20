import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta } from '@storybook/react';

import Pokedex from './Pokedex';
import { initialState } from './pokedexSlice';
import { PokedexStateProps } from './types/slice';

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
};

interface MockStoreProps {
  pokedexState: PokedexStateProps;
  children: React.ReactNode;
}

// Create a mock store
const mockSlice = (pokedexState: PokedexStateProps) => {
  return createSlice({
    name: 'pokedex',
    initialState: pokedexState,
    reducers: {},
  });
};
const mockStore = (pokedexState: PokedexStateProps) => {
  return configureStore({
    reducer: {
      pokedex: mockSlice(pokedexState).reducer,
    },
  });
};
const Mockstore: React.FC<MockStoreProps> = ({ pokedexState, children }) => (
  <Provider store={mockStore(pokedexState)}>{children}</Provider>
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
      <Mockstore pokedexState={initialState}>{story()}</Mockstore>
    ),
  ],
};

export const Primary = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore pokedexState={MockedState.pokedex}>{story()}</Mockstore>
    ),
  ],
  args: {
    selectedRegion: 'kanto',
    selectedType: 'All Types',
    selectedSort: 'id',
    searchInput: '',
  },
};
