import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const ModalView = ({ show, url, hideModal }) => {
  return (
    <Modal
      show={show}
      size="lg"
      fullscreen
      onHide={() => hideModal()}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={url} fluid></Image>
      </Modal.Body>
    </Modal>
  );
};

export default ModalView;
