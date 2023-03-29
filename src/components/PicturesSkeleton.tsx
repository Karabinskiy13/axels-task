import { Grid } from '@mui/material';
import React from 'react';
import { SkeletonPicture } from '../styled/PicturesSkeleton';

import { Columns } from '../styled/SinglePicture';

const PicturesSkeleton = () => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Columns>
          <SkeletonPicture></SkeletonPicture>
        </Columns>
      </Grid>
    </>
  );
};

export default PicturesSkeleton;
