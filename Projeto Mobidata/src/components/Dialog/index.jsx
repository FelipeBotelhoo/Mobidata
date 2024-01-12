import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './dialog.style.css'


export const Dialog = ({ show, onHide, onConfirm, message }) => {
  const confirmAction = () => {
    onConfirm();
  };

  const cancelAction = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>  Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='message-sheet'>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={cancelAction}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={confirmAction}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

