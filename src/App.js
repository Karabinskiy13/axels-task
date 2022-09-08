/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PictureList, ModalView } from './components';
import { GlobalStyle } from './styled/Global';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<PictureList />}>
          <Route path={':q'} element={<PictureList />} />
          <Route path={'/modal'} element={<ModalView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
