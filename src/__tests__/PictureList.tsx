import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

import store from '../redux/store';
import { PictureList } from '../components';

test('Should render App component', async () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <PictureList />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
  await screen.findByPlaceholderText('Press enter to add new tag');
  expect(screen.getByPlaceholderText('Press enter to add new tag'));
  expect(asFragment()).toMatchSnapshot();
});
