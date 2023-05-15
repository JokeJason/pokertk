import type { Meta, StoryObj } from '@storybook/react';

import PokemonCard from './PokemonCard';

import charizard_svg from './assets/stories/charizard.svg';
import charizard_info from './assets/stories/charizard.json';

const meta: Meta<typeof PokemonCard> = {
  title: 'Component/PokemonCard',
  component: PokemonCard,
};
export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Charizard: Story = {
  args: {
    id: 6,
    name: charizard_info.name,
    image: charizard_svg,
    types: ['fire', 'flying'],
  },
};

export const Bulbasaur: Story = {
  args: {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    types: ['grass', 'poison'],
  },
};
