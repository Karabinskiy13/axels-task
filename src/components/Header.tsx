import React from 'react';

import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

import { LinkTo } from '../styled/PictureList';

export const Header = () => {
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
            <CameraAltIcon />
            Picture Application
          </Typography>
          <LinkTo role="button" onClick={() => navigate('/charts')} style={{ color: 'white' }}>
            <BarChartIcon />
          </LinkTo>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
