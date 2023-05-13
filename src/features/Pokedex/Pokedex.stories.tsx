import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import Pokedex, { PokedexProps } from './Pokedex';
import * as PokemonCardStories from 'components/PokemonCard/PokemonCard.stories';
import { initialState } from './pokedexSlice';
import { PokedexStateProps } from './types/slice';
import { ComponentStory } from '@storybook/react';

const Mockstate = {
  // Copied from Redux DevTools from browser
  pokedex: {
    isLoadingPokemons: true,
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
    ],
  },
  filter: {
    regionOptions: [],
    typeOptions: [],
    sortOptions: [],
    selectedRegion: '',
    selectedType: '',
    selectedSort: '',
    searchInput: '',
  },
  pokeApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      online: true,
      focused: true,
      middlewareRegistered: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: 'pokeApi',
    },
  },
};

interface MockStoreProps {
  pokedexState: PokedexStateProps;
  children: React.ReactNode;
}

const mockSlice = (pokedexState: PokedexStateProps) => {
  return createSlice({
    name: 'pokedex',
    initialState: pokedexState,
    reducers: {
      setIsLoadingPokemons: (state, action) => {
        state.isLoadingPokemons = action.payload;
      },
    },
  });
};

const mockStore = (pokedexState: PokedexStateProps) => {
  return configureStore({
    reducer: {
      pokedex: mockSlice(pokedexState).reducer,
    },
  });
};

// A super-simple mock of a redux store
const Mockstore: React.FC<MockStoreProps> = ({ pokedexState, children }) => (
  <Provider store={mockStore(pokedexState)}>{children}</Provider>
);

export default {
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

export const Default = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore pokedexState={initialState}>{story()}</Mockstore>
    ),
  ],
};

// const Template: ComponentStory<typeof Pokedex> = (args: PokedexProps) => (
//   <Pokedex {...args} />
// );
//
// export const Primary = Template.bind({});
// Primary.args = {
//   selectedRegion: 'kanto',
//   selectedType: 'All Types',
//   selectedSort: 'id',
//   searchInput: '',
// };
