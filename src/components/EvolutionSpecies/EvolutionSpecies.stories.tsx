import EvolutionSpecies, { EvolutionSpeciesProps } from './EvolutionSpecies';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/EvolutionSpecies',
  component: EvolutionSpecies,
} as ComponentMeta<typeof EvolutionSpecies>;

const Template: ComponentStory<typeof EvolutionSpecies> = (
  args: EvolutionSpeciesProps,
) => <EvolutionSpecies {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  types: ['grass', 'poison'],
  image_url:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  name: 'Bulbasaur',
};

export const Bulbasaur = Template.bind({});
Bulbasaur.args = {
  types: ['grass', 'poison'],
  image_url:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  name: 'Bulbasaur',
};

export const Magneton = Template.bind({});
Magneton.args = {
  types: ['electric', 'steel'],
  image_url:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/82.svg',
  name: 'Magneton',
};
