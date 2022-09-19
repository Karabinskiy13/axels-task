import React from 'react';

import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Columns } from '../styled/SinglePicture';
import { IImage } from '../interfaces/Image';

type Props = {
  picture: IImage
  showModal: (status:boolean) => void | undefined 
  largeImageURL?:string
  hits?:string
}

const SinglePicture = ({ picture, showModal } : Props) => (
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
          src={picture.previewURL}
        />
      </Card.Body>
    </Card>
  </Columns>
);

export default SinglePicture;
