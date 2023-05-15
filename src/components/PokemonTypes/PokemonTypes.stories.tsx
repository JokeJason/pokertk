import type { Meta, StoryObj } from '@storybook/react';

import PokemonTypes from './PokemonTypes';

const meta: Meta<typeof PokemonTypes> = {
  title: 'Component/PokemonTypes',
  component: PokemonTypes,
};

export default meta;
type Story = StoryObj<typeof PokemonTypes>;

export const charmander: Story = {
  args: {
    types: ['fire'],
  },
};

export const bulbasaur: Story = {
  args: {
    types: ['grass', 'poison'],
  },
};

export const charizard: Story = {
  args: {
    types: ['fire', 'flying'],
  },
};

export const threetypes: Story = {
  args: {
    types: ['fire', 'flying', 'grass'],
  },
};
