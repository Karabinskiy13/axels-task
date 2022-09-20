import React from 'react';

import { Modal, Image } from 'react-bootstrap';

const ModalView = ({ show, url, hideModal }) => (
  <Modal
    show={show}
    size="lg"
    fullscreen
    onHide={() => hideModal()}
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Image Preview</Modal.Title>
      <br />
    </Modal.Header>
    <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image src={url} fluid></Image>
    </Modal.Body>
  </Modal>
);

export default ModalView;
