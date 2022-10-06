import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import store from '../redux/store';

import { Chart } from '../components';

export default {
  component: Chart
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Chart />;
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
);

export const PictureListComponent = Template.bind({});
