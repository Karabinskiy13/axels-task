import styled from 'styled-components';
import { Card, Col } from 'react-bootstrap';

export const Picture = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Columns = styled(Col)`
  margin-top: 20px;
  cursor: pointer;
`;
export const Modal = styled.button`
  border: none;
  background: none;
`;
