import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';

import { PictureList } from './components';

const App = () => {
  return (
    <div className="App">
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path={'/'} element={<PictureList />} />
        </Routes>
      </QueryParamProvider>
    </div>
  );
};

export default App;
