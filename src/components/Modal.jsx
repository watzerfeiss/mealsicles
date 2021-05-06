import React, { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalContext } from "./ModalContainer";
import PropTypes from "prop-types";

function Modal({ onClose, children }) {
  const { modalContainerRef, openModal, closeModal } = useContext(ModalContext);

  const handleClose = () => {
    onClose();
    closeModal();
  };

  const closeOnEscape = (evt) => {
    if (evt.key === "Escape") {
      handleClose();
    }
  };

  // focus trap
  const modalRef = useRef(null);
  const defaultFocusedElementRef = useRef(null);
  useEffect(() => {
    defaultFocusedElementRef.current.focus();

    const trapFocus = (evt) => {
      if (modalRef.current.contains(evt.target)) {
        return;
      }
      defaultFocusedElementRef.current.focus();
    };

    document.addEventListener("focusin", trapFocus);

    return () => {
      document.removeEventListener("focusin", trapFocus);
    };
  }, []);

  useEffect(() => {
    openModal();
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      handleClose();
    };
  }, []);

  const modalElement = (
    <div className="modal" ref={modalRef}>
      <div className="modal__close-btn-wrapper">
        <button
          className="btn modal__close-btn"
          type="button"
          value="Close"
          onClick={handleClose}
          ref={defaultFocusedElementRef}
        >
          Close
        </button>
      </div>
      {children}
    </div>
  );

  return createPortal(modalElement, modalContainerRef.current);
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
