import Grid from '@mui/material/Grid';
import React from 'react';

import { Columns } from '../styled/SinglePicture';
import { Image } from '../types';

interface Props {
  picture: Image;
  showModal: (status: boolean) => void;
}

const SinglePicture = ({ picture, showModal }: Props) => (
  <Grid item xs={12} md={4} lg={3}>
    <Columns>
      <img
        className="picture__image"
        alt="picture__image"
        src={picture.previewURL}
        onClick={() => showModal(true)}
      />
    </Columns>
  </Grid>
);

export default SinglePicture;
