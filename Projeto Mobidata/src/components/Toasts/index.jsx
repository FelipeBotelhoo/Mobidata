import React from 'react';
import Toast from 'react-bootstrap/Toast';
import './toasts.style.css'; 
import Logo from '../../img/logopngwhite.png';

export const Toasts = ({ show, onClose, message }) => {
  return (
    <Toast show={show} onClose={onClose} className="custom-toast">
      <Toast.Header>
       <img src={Logo} alt="logo" className='logo' />
        <strong className="titulo-toast me-auto"> MobiData</strong>
      </Toast.Header>
      <Toast.Body className='message-toast'>{message}</Toast.Body>
    </Toast>
  );
};
