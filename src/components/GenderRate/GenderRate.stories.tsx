import GenderRate, { GenderRateProps } from './GenderRate';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/GenderRate',
  component: GenderRate,
} as ComponentMeta<typeof GenderRate>;

const Template: ComponentStory<typeof GenderRate> = (args: GenderRateProps) => (
  <GenderRate {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  genderRatio: 0,
};
