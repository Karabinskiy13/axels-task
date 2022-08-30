import React from 'react';
import './App.css';
import PictureList from './components/PictureListComponent/PictureList';
import { pictureService } from './services/picture.service';

function App() {
  pictureService.getImagesByQuery();
  return (
    <div className="App">
      <PictureList />
    </div>
  );
}

export default App;
