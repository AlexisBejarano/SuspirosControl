import React, { useState } from "react";
import Modal from "./ModalPlantilla";

export default function ButtonDefault({ textButton, bgButton, hoverBgButton, widthButton, marginButton, colorButton, modalType, modalData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleButtonClick} className={`${bgButton} ${hoverBgButton} ${widthButton} ${colorButton} px-3 py-1 ${marginButton} rounded-lg transition`}>
        {textButton}
      </button>

      <Modal
        modalType={modalType}
        modalData={modalData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}