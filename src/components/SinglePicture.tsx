import React from 'react';

import Grid from '@mui/material/Grid';

import { Columns, Images, Cross } from '../styled/SinglePicture';
import { FavoriteImage } from '../types';

interface Props {
  picture: FavoriteImage;
  showModal: (status: boolean) => void;
  remove?: () => void;
}

const SinglePicture = ({ picture, showModal, remove }: Props) => (
  <Grid item xs={12} md={4} lg={3}>
    <Columns>
      <Images
        className="picture__image"
        alt="picture__image"
        src={picture.previewURL}
        onClick={() => showModal(true)}
      />
    </Columns>
    {remove && <Cross onClick={() => remove()}>Remove &times;</Cross>}
  </Grid>
);

export default SinglePicture;
