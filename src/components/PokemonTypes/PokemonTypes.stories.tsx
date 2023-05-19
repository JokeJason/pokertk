import type { Meta, StoryObj } from '@storybook/react';

import PokemonTypes from './PokemonTypes';

const meta: Meta<typeof PokemonTypes> = {
  title: 'Component/PokemonTypes',
  component: PokemonTypes,
};

export default meta;
type Story = StoryObj<typeof PokemonTypes>;

export const fireOnly: Story = {
  name: 'Fire only',
  args: {
    types: ['fire'],
  },
};

export const grassAndPoinson: Story = {
  name: 'Grass and Poison',
  args: {
    types: ['grass', 'poison'],
  },
};

export const fireAndFlying: Story = {
  name: 'Fire and Flying',
  args: {
    types: ['fire', 'flying'],
  },
};

export const threeTypes: Story = {
  name: 'Fire, Flying and Grass',
  args: {
    types: ['fire', 'flying', 'grass'],
  },
};
