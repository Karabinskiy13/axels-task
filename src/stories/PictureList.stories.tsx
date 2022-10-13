import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import store from '../redux/store';

import { PictureList } from '../components';

export default {
  component: PictureList
} as ComponentMeta<typeof PictureList>;

const Template: ComponentStory<typeof PictureList> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <PictureList />;
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
);

export const PictureListComponent = Template.bind({});
