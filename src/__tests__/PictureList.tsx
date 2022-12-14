import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

import store from '../redux/store';
import { PictureList } from '../components';

test('Should render Header component', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <PictureList />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
  await screen.findByText('Picture Application');
  expect(screen.getByText('Picture Application')).toHaveTextContent('Picture Application');
});
test('Should create snapshot', async () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <PictureList />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
