import React, { useState } from "react";
import Modal from "./ModalPlantilla";
import ModalContenidoAll from "./ModalContenidoAll";

export default function ButtonDefault({ textButton, bgButton, hoverBgButton, widthButton, marginButton, colorButton, modalType, modalData,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Obtener el título y el contenido del modal
  const { titulo, contenido } = ModalContenidoAll({ modalType, modalData });

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`${bgButton} ${hoverBgButton} ${widthButton} ${colorButton} px-3 py-1 ${marginButton} rounded-lg transition`}
      >
        {textButton}
      </button>

      <Modal
        titulo={titulo} // Título dinámico
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={contenido} // Contenido dinámico
      />
    </>
  );
} 