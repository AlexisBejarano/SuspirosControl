import React, { useState } from "react";
import Modal from "./ModalPlantilla";

export default function ButtonCaducidad({ buttonCaducidad, detalles }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
        {buttonCaducidad}
      </button>

      <Modal
        titulo={"Detalles de Caducidad"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={detalles.map((lote, index) => (
          <div key={index} className="border-b pb-2 mb-2">
            <p><strong>Lote:</strong> {lote.lote}</p>
            <p><strong>Caducidad:</strong> {lote.caducidad}</p>
            <p><strong>Cantidad:</strong> {lote.cantidad}</p>
          </div>
        ))}
      />
    </>
  );
}

