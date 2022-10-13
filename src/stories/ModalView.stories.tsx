import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ModalView } from '../components';

export default {
  component: ModalView
} as ComponentMeta<typeof ModalView>;

const Template: ComponentStory<typeof ModalView> = (args) => <ModalView {...args} />;

export const ModalViewComponent = Template.bind({});
ModalViewComponent.args = {
  show: true,
  url: 'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_960_720.jpg'
};
