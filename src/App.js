import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PictureList from './components/PictureListComponent/PictureList';
import { pictureService } from './services/picture.service';

function App() {
  pictureService.getImagesByQuery();
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<PictureList />}>
          <Route path={':lastTags'} element={<PictureList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
