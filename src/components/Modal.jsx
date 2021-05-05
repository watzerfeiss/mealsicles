import React, { useEffect, useContext } from "react";
import { createPortal } from "react-dom";

import { ModalContext } from "./ModalContainer";
import PropTypes from "prop-types";

function Modal({ onClose, children }) {
  const { modalContainerRef, openModal, closeModal } = useContext(ModalContext);

  useEffect(() => openModal(), []);

  const modalElement = (
    <div className="modal">
      <button
        className="modal__close-btn"
        type="button"
        value="Close"
        onClick={() => {
          onClose();
          closeModal();
        }}
      >
        Close
      </button>
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
