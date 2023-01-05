import React from 'react';

import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';

import { LinkTo } from '../styled/PictureList';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks';
import { removeUser } from '../redux/ducks/auth';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <CameraAltIcon />
            Picture Application
          </Typography>
          <LinkTo role="button" onClick={() => navigate('/charts')} style={{ color: 'white' }}>
            <BarChartIcon />
          </LinkTo>
          <LinkTo role="button" onClick={() => navigate('/favorites')} style={{ color: 'white' }}>
            <StarIcon />
          </LinkTo>
          <LinkTo role="button" onClick={() => dispatch(removeUser())} style={{ color: 'white' }}>
            <LogoutIcon />
          </LinkTo>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
