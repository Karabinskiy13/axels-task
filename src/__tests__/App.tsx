import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

import App from '../App';
import store from '../redux/store';

test('Should render App component', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
