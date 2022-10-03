import React from 'react';

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
    <img
      className="picture__image"
      alt="picture__image"
      src={picture.previewURL}
      onClick={() => showModal(true)}
    />
  </Columns>
);

export default SinglePicture;
