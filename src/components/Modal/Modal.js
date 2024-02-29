import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const Modal = ({ onClose, url, alt }) => {
  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {
    const handelKeyUp = e => {
      if (e.code === 'Escape') {
        addCloseClass();
        onClose();
      }
    };

    window.addEventListener('keydown', handelKeyUp);

    return () => {
      window.removeEventListener('keydown', handelKeyUp);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      addCloseClass();
      onClose();
    }
  };

  const addCloseClass = () => {
    const Overlay = document.querySelector('#CloseAnimateOverlay');
    const Modal = document.querySelector('#CloseAnimateModal');
    Overlay.classList.add(`${s.CloseAnimate}`);
    Modal.classList.add(`${s.CloseAnimate}`);
  };

  return createPortal(
    <div
      id="CloseAnimateOverlay"
      className={s.Overlay}
      onClick={handleBackdropClick}
    >
      <div id="CloseAnimateModal" className={s.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
