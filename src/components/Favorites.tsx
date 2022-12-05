import React, { useEffect, useState } from 'react';
import { Grid, Container, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SinglePicture from './SinglePicture';
import { useNavigate } from 'react-router';

const Favorites = () => {
  const { favorites } = useSelector((state: RootState) => state.pictureReducer);

  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginLeft="64px">
            Favorites
          </Typography>
        </Toolbar>
      </AppBar>
      <Button style={{ margin: '10px' }} onClick={() => navigate('/')} variant="outlined">
        Back to Pictures
      </Button>
      <Container maxWidth="xl" style={{ marginTop: '30px' }}>
        <Grid container spacing={2}>
          {favorites &&
            favorites.map((picture) => (
              <SinglePicture key={picture.id} picture={picture} showModal={() => null} />
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Favorites;
