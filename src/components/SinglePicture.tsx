import React from 'react';

import Card from 'react-bootstrap/Card';

import { Columns } from '../styled/SinglePicture';
import { Image } from '../types';

interface Props {
  picture: Image;
  showModal: (status: boolean) => void;
  largeImageURL?: string;
  hits?: string;
}

const SinglePicture = ({ picture, showModal }: Props) => (
  <Columns>
    <Card
      className="picture"
      onClick={() => showModal(true)}
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
          alt="picture__image"
          src={picture.previewURL}
        />
      </Card.Body>
    </Card>
  </Columns>
);

export default SinglePicture;
