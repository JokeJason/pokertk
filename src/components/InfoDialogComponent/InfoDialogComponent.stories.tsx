import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import InfoDialogComponent from './InfoDialogComponent';
import { InfoDialogStateProps } from 'features/InfoDialog/infoDialogSlice';

const MockedState = {
  // Copied from Redux DevTools from browser
  infoDialog: {
    isOpen: false,
    InfoDialogDetails: {
      id: 0,
      name: '',
      genera: '',
      image: '',
      types: [],
      height: 0,
      weight: 0,
      genderRatio: 0,
      description: '',
      abilities: [],
      stats: [],
      evolutionChain: [],
    },
  },
};

interface MockStoreProps {
  InfoDialogState: InfoDialogStateProps;
  children: React.ReactNode;
}

const mockSlice = (infoDialogState: {
  InfoDialogState: InfoDialogStateProps;
}) => {
  return createSlice({
    name: 'infoDialog',
    initialState: infoDialogState,
    reducers: {},
  });
};

const mockStore = (infoDialogState: {
  InfoDialogState: InfoDialogStateProps;
}) => {
  return configureStore({
    reducer: {
      infoDialog: mockSlice(infoDialogState).reducer,
    },
  });
};

const Mockstore: React.FC<MockStoreProps> = ({ InfoDialogState, children }) => (
  <Provider store={mockStore({ InfoDialogState })}>{children}</Provider>
);

const meta: Meta<typeof InfoDialogComponent> = {
  title: 'Component/InfoDialogComponent',
  component: InfoDialogComponent,
  decorators: [
    (story: () => React.ReactNode) => (
      <div style={{ padding: '3rem' }}>{story()}</div>
    ),
  ],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export default meta;
type Story = StoryObj<typeof InfoDialogComponent>;

export const Duduo: Story = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore InfoDialogState={MockedState.infoDialog}>{story()}</Mockstore>
    ),
  ],
  args: {
    openDialog: true,
    id: 84,
    name: 'Doduo',
    genera: 'Twin Bird Pokémon',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/84.svg',
    types: ['normal', 'flying'],
    height: 14,
    weight: 392,
    genderRatio: 4,
    description:
      'A bird that makes up for its poor flying with its fast foot speed. Leaves giant footprints.',
    abilities: ['run-away', 'early-bird', 'tangled-feet'],
    stats: [
      { stat__name: 'hp', stat__value: 35 },
      { stat__name: 'attack', stat__value: 85 },
      { stat__name: 'defense', stat__value: 45 },
      { stat__name: 'special-attack', stat__value: 35 },
      { stat__name: 'special-defense', stat__value: 35 },
      { stat__name: 'speed', stat__value: 75 },
    ],
    evolutionChain: [
      {
        types: ['normal', 'flying'],
        image_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/84.svg',
        name: 'Doduo',
      },
      {
        name: 'Dodrio',
        types: ['normal', 'flying'],
        image_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/85.svg',
      },
    ],
  },
};
