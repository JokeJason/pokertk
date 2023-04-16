import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import PokemonCard, { PokemonCardProps } from './PokemonCard';

import charizard_svg from './assets/stories/charizard.svg';
import charizard_info from './assets/stories/charizard.json';

export default {
  title: 'Pokedex/PokemonCard',
  component: PokemonCard,
} as ComponentMeta<typeof PokemonCard>;

const Template: ComponentStory<typeof PokemonCard> = (
  args: PokemonCardProps,
) => <PokemonCard {...args} />;

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
