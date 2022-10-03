import React from 'react';

import { Modal } from '@mui/material';

import { StyledModal } from '../styled/ModalView';

type Props = {
  show: boolean;
  url: string;
  hideModal: () => void;
};

const ModalView = ({ show, url, hideModal }: Props) => (
  <Modal open={show} onClose={() => hideModal()} aria-describedby="modal-modal-picture">
    <StyledModal>
      <img
        className="modal__image"
        alt="modal__image"
        src={url}
        style={{ maxWidth: '1024px', maxHeight: '800px' }}
      />
    </StyledModal>
  </Modal>
);

export default ModalView;
