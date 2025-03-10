import React from "react";
import ModalContenidoAll from "./ModalContenidoAll";

export default function Modal({ modalType, modalData, isOpen, onClose }) {
  if (!isOpen) return null;

  const { titulo, contenido } = ModalContenidoAll({ modalType, modalData });

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-1">{titulo}</h2>
        <div className="overflow-y-auto">{contenido}</div>
        <div className="mx-full mt-4">
          <div className="flex justify-center items-center space-x-4">
            <button onClick={onClose} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Aceptar
            </button>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cerrar  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}