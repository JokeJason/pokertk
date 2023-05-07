import InfoDialog, { InfoDialogProps } from './InfoDialog';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Features/InfoDialog',
  component: InfoDialog,
} as ComponentMeta<typeof InfoDialog>;

const Template: ComponentStory<typeof InfoDialog> = (args: InfoDialogProps) => (
  <InfoDialog {...args} />
);
