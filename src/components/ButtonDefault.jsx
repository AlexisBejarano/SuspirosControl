import React, { useState } from "react"; // Importa useState
import ModalContenidoAll from "./ModalContenidoAll";
export default function ButtonDefault({ textButton, bgButton, hoverBgButton, widthButton, marginButton, colorButton, modalType, modalData, paddingButtonX, paddingButtonY, onCerrarSesion }) {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const { titulo, contenido, buttons } = ModalContenidoAll({
    modalType,
    modalData,
    onClose: () => {
      setIsOpen(false); // Cierra el modal
      if (modalType === "cerrarSesion" && onCerrarSesion) {
        onCerrarSesion(); // Ejecuta la función de cierre de sesión
      }
    },
    setIsOpen, // Pasamos setIsOpen para que "Cancelar" pueda cerrar el modal
  });

  return (
    <>
      <button onClick={handleButtonClick} className={`${bgButton} ${hoverBgButton} ${widthButton} ${colorButton} ${paddingButtonX} ${paddingButtonY} ${marginButton} rounded-lg transition`}>
        {textButton}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-1 text-center">{titulo}</h2>
            <div className="overflow-y-auto">{contenido}</div>
            <div className="mx-full mt-4">
              <div className="flex justify-center items-center space-x-2">{buttons}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
