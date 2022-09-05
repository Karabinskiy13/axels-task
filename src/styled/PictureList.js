import styled from 'styled-components';

import { colors } from './Global';

export const Forma = styled.div`
  max-width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.label`
  background-color: ${colors.bgColor};
  color: ${colors.headerColor};
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 20px;
`;
export const Tags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
