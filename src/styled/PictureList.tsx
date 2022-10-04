import styled from 'styled-components';
import Button from '@mui/material/Button';

import { colors } from './Global';

export const Forma = styled.div`
  max-width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
export const TagsStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .ReactTags__tags {
    position: relative;
  }

  .ReactTags__tagInput {
    border-radius: 2px;
    display: inline-block;
  }
  .ReactTags__tagInput input.ReactTags__tagInputField,
  .ReactTags__tagInput input.ReactTags__tagInputField:focus {
    height: 31px;
    width: 330px;
    margin-top: 10px;
    font-size: 18px;
    border: 3px solid ${colors.bgColor};
    border-radius: 10px;
    min-width: 150px;
  }

  .ReactTags__selected span.ReactTags__tag {
    border: 1px solid #ddd;
    background: ${colors.borderColor};
    color: ${colors.bgColor};
    font-size: 18px;
    display: inline-block;
    padding: 5px;
    margin-top: 10px;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .ReactTags__selected a.ReactTags__remove {
    color: ${colors.headerColor};
    margin-left: 10px;
    cursor: pointer;
  }
  .ReactTags__remove {
    margin-left: 15px;
    border: 1px solid ${colors.bgColor};
    cursor: pointer;
    background: none;
    color: white;
  }
`;
export const LoadMore = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export const LinkTo = styled(Button)`
  color: white;
  cursor: pointer;
`;
