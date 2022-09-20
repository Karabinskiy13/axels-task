import React from 'react';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Columns } from '../styled/SinglePicture';

const SinglePicture = ({ picture, showModal }) => (
  <Columns>
    <Card
      className="picture"
      onClick={() => showModal()}
      border="dark"
      style={{ cursor: 'pointer', maxWidth: '200px' }}>
      <Card.Body
        style={{
          textAlign: 'center',
          minHeight: '180px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Card.Img
          style={{ maxWidth: '100%', width: 'auto', height: '100%' }}
          className="picture__image"
          src={picture.previewURL}
        />
      </Card.Body>
    </Card>
  </Columns>
);

export default SinglePicture;
