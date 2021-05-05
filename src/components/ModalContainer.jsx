import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const ModalContext = React.createContext(null);

function ModalContainer({ children }) {
  const modalContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ctxValue = {
    openModal: () => (isModalOpen ? null : setIsModalOpen(true)),
    closeModal: () => setIsModalOpen(false),
    modalContainerRef
  };

  return (
    <>
      <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
      <div
        id="modal-container"
        className={`modal-container ${
          isModalOpen ? "modal-container--active" : ""
        }`}
        ref={modalContainerRef}
      ></div>
    </>
  );
}

ModalContainer.propTypes = {
  children: PropTypes.node
};

export default ModalContainer;

export { ModalContext };
