import React from 'react';

import { Modal, Image } from 'react-bootstrap';

type Props = {
  show: boolean;
  url: string;
  hideModal: () => void;
};

const ModalView = ({ show, url, hideModal }: Props) => (
  <Modal
    show={show}
    size="lg"
    fullscreen
    onHide={() => hideModal()}
    aria-labelledby="contained-modal-title-vcenter"
    centred>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Image Preview</Modal.Title>
      <br />
    </Modal.Header>
    <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image className="modal__image" src={url} fluid></Image>
    </Modal.Body>
  </Modal>
);

export default ModalView;
