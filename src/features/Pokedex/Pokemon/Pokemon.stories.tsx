import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pokemon, { PokemonProps } from './Pokemon';

import charizard_svg from './assets/stories/charizard.svg';
import charizard_info from './assets/stories/charizard.json';

export default {
  title: 'Pokedex/PokemonCard',
  component: Pokemon,
} as ComponentMeta<typeof Pokemon>;

const Template: ComponentStory<typeof Pokemon> = (args: PokemonProps) => (
  <Pokemon {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  name: charizard_info.name,
  number: 6,
  image: charizard_svg,
  types: ['fire', 'flying'],
};

export const Charizard = Template.bind({});
Charizard.args = {
  name: charizard_info.name,
  number: 6,
  image: charizard_svg,
  types: ['fire', 'flying'],
};
