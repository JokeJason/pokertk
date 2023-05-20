import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import EvolutionSpecies from './EvolutionSpecies';
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

const meta: Meta<typeof EvolutionSpecies> = {
  title: 'Component/EvolutionSpecies',
  component: EvolutionSpecies,
  decorators: [
    (story: () => React.ReactNode) => (
      <div style={{ padding: '3rem' }}>{story()}</div>
    ),
  ],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export default meta;
type Story = StoryObj<typeof EvolutionSpecies>;

export const Bulbasaur: Story = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore InfoDialogState={MockedState.infoDialog}>{story()}</Mockstore>
    ),
  ],
  args: {
    types: ['grass', 'poison'],
    image_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    name: 'Bulbasaur',
  },
};

export const Magneton: Story = {
  decorators: [
    (story: () => React.ReactNode) => (
      <Mockstore InfoDialogState={MockedState.infoDialog}>{story()}</Mockstore>
    ),
  ],
  args: {
    types: ['electric', 'steel'],
    image_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/82.svg',
    name: 'Magneton',
  },
};
