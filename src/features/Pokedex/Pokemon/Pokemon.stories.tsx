import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pokemon, { PokemonProps } from './Pokemon';
import charizard from 'assets/charizard.svg';

export default {
  title: 'Pokedex/PokemonCard',
  component: Pokemon,
} as ComponentMeta<typeof Pokemon>;

const Template: ComponentStory<typeof Pokemon> = (args: PokemonProps) => (
  <Pokemon {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  name: 'Charizard',
  number: '#006',
  image: charizard,
};

export const Charizard = Template.bind({});
Charizard.args = {
  name: 'Charizard',
  number: '#006',
  image: charizard,
};
