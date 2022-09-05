/* eslint-disable no-unused-vars */
import React from 'react';
import { GlobalStyle } from './styled/Global';
import PictureList from './components/PictureList';
import ModalView from './components/ModalView';

function App() {
  return (
    <div className="App">
      <ModalView />
      <PictureList />
    </div>
  );
}

export default App;
