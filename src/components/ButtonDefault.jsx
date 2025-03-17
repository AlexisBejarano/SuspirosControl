import React, { useState } from "react";
import ModalContenidoAll from "./ModalContenidoAll";

export default function ButtonDefault({
  textButton,
  bgButton,
  hoverBgButton,
  widthButton,
  marginButton,
  colorButton,
  modalType,
  modalData,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true); // Abre el modal
  };

  const { titulo, contenido, buttons } = ModalContenidoAll({
    modalType,
    modalData,
    onClose: () => setIsOpen(false), // Pasas la función para cerrar el modal
  });

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`${bgButton} ${hoverBgButton} ${widthButton} ${colorButton} px-3 py-1 ${marginButton} rounded-lg transition`}
      >
        {textButton}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-1">{titulo}</h2>
            <div className="overflow-y-auto">{contenido}</div>
            <div className="mx-full mt-4">
              <div className="flex justify-center items-center space-x-4">
                {buttons} {/* Renderiza los botones aquí */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
