import { Provider } from 'react-redux';
import type { Meta, StoryObj } from '@storybook/react';

import EvolutionSpecies from './EvolutionSpecies';
import {
  MockedState,
  MockStoreProps,
  mockStore,
} from 'features/InfoDialog/infoDialogSlice.storybook';

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
