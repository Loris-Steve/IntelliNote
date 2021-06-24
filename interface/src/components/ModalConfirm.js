import React, { useState } from 'react';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalConfirm(props) {
  console.log(" showww : "+props.show);
  
    const handleClose = () => props.showModalConfirm(false);

    const actionModal = () => {
      props.actionModal();
      handleClose();
    }

    return (
      <>
        {/* <Button variant="secondary" onClick={handleShow} className="mt-3">
          {props.name}
        </Button> */}
  
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton className="">
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              annuler
            </Button>
            <Button variant="danger" onClick={actionModal}>
            {props.action}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  