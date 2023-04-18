import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import PokemonTypes, { PokemonTypesProps } from './PokemonTypes';

export default {
  title: 'Component/PokemonTypes',
  component: PokemonTypes,
} as ComponentMeta<typeof PokemonTypes>;

const Template: ComponentStory<typeof PokemonTypes> = (
  args: PokemonTypesProps,
) => <PokemonTypes {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  types: ['fire'],
};

export const bulbasaur = Template.bind({});
bulbasaur.args = {
  types: ['grass', 'poison'],
};

export const charizard = Template.bind({});
charizard.args = {
  types: ['fire', 'flying'],
};

export const threetypes = Template.bind({});
threetypes.args = {
  types: ['fire', 'flying', 'grass'],
};
