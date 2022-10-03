import styled from 'styled-components';
import { Box } from '@mui/material';

import { colors } from './Global';

export const StyledModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1200px;
  max-height: 1000px;
  bgcolor: ${colors.bgColor};
  border: 2px solid ${colors.bgColor};
  box-shadow: 24;
  p: 4;
`;
