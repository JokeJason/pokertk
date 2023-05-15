import type { Meta, StoryObj } from '@storybook/react';

import EvolutionSpecies from './EvolutionSpecies';

const meta: Meta<typeof EvolutionSpecies> = {
  title: 'Component/EvolutionSpecies',
  component: EvolutionSpecies,
};

export default meta;
type Story = StoryObj<typeof EvolutionSpecies>;

export const Bulbasaur: Story = {
  args: {
    types: ['grass', 'poison'],
    image_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    name: 'Bulbasaur',
  },
};

export const Magneton: Story = {
  args: {
    types: ['electric', 'steel'],
    image_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/82.svg',
    name: 'Magneton',
  },
};
