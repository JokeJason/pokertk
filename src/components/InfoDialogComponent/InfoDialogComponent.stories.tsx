import type { Meta, StoryObj } from '@storybook/react';

import InfoDialogComponent from './InfoDialogComponent';

const meta: Meta<typeof InfoDialogComponent> = {
  title: 'Component/InfoDialogComponent',
  component: InfoDialogComponent,
};

export default meta;
type Story = StoryObj<typeof InfoDialogComponent>;

export const Duduo: Story = {
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
