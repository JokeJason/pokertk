import type { Meta, StoryObj } from '@storybook/react';

import GenderRate from './GenderRate';

const meta: Meta<typeof GenderRate> = {
  title: 'Component/GenderRate',
  component: GenderRate,
};

export default meta;
type Story = StoryObj<typeof GenderRate>;

export const Option1: Story = {
  args: {
    genderRatio: 1,
  },
};

export const Option2: Story = {
  args: {
    genderRatio: 2,
  },
};
