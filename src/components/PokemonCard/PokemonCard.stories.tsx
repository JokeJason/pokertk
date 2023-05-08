import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import PokemonCard, { PokemonCardProps } from './PokemonCard';

import charizard_svg from './assets/stories/charizard.svg';
import charizard_info from './assets/stories/charizard.json';

export default {
  title: 'Component/PokemonCard',
  component: PokemonCard,
} as ComponentMeta<typeof PokemonCard>;

const Template: ComponentStory<typeof PokemonCard> = (
  args: PokemonCardProps,
) => <PokemonCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id: 6,
  name: charizard_info.name,
  image: charizard_svg,
  types: ['fire', 'flying'],
};

export const Charizard = Template.bind({});
Charizard.args = {
  id: 6,
  name: charizard_info.name,
  image: charizard_svg,
  types: ['fire', 'flying'],
};

export const Bulbasaur = Template.bind({});
Bulbasaur.args = {
  id: 1,
  name: 'bulbasaur',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  types: ['grass', 'poison'],
};
