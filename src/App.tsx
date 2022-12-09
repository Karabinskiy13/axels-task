import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

import { PictureList, Chart } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favorites from './components/Favorites';

const App = () => (
  <div className="App">
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path={'/'} element={<PictureList />} />
        <Route path={'/charts'} element={<Chart />} />
        <Route path={'/favorites'} element={<Favorites />} />
      </Routes>
    </QueryParamProvider>
  </div>
);

export default App;
