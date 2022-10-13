import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import store from '../redux/store';

import { Header } from '../components';

export default {
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Header />;
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
);

export const HeaderComponent = Template.bind({});
