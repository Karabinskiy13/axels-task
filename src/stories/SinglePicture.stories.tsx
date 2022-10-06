import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SinglePicture } from '../components';

export default {
  component: SinglePicture
} as ComponentMeta<typeof SinglePicture>;

const Template: ComponentStory<typeof SinglePicture> = (args) => <SinglePicture {...args} />;

export const SinglePictureComponent = Template.bind({});
SinglePictureComponent.args = {
  picture: {
    largeImageURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
    previewURL: 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg',
    id: 195893,
    tags: 'flower'
  }
};
