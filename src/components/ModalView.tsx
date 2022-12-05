import React from 'react';

import { Modal, Button } from '@mui/material';

import { StyledModal } from '../styled/ModalView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToFavorites } from '../redux/ducks/pictures';

type Props = {
  show: boolean;
  url: string;
  hideModal: () => void;
};

const ModalView = ({ show, url, hideModal }: Props) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.pictureReducer);

  const handle = (url: any) => {
    dispatch(addToFavorites({ previewURL: url }));
  };
  console.log(favorites);

  return (
    <Modal open={show} onClose={() => hideModal()} aria-describedby="modal-modal-picture">
      <StyledModal>
        <img
          className="modal__image"
          alt="modal__image"
          src={url}
          style={{ width: '100%', maxHeight: '800px' }}
        />
        <Button
          style={{ width: '100%' }}
          color="info"
          variant="contained"
          onClick={() => handle(url)}>
          Add to Favorite
        </Button>
      </StyledModal>
    </Modal>
  );
};

export default ModalView;
