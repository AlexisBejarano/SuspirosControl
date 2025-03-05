// ButtonCaducidad.jsx
import React, { useState } from "react";
import Modal from "./ModalPlantilla";

export default function ButtonCaducidad({ detalles }) {
  const [isOpen, setIsOpen] = useState(false);

  // Función para obtener la fecha de caducidad más próxima
  const obtenerCaducidadProxima = (producto) => {
    const fechas = producto.map((lote) => new Date(lote.caducidad));
    return fechas.length ? new Date(Math.min(...fechas)).toISOString().split("T")[0] : "N/A";
  };

  // Obtener la caducidad más próxima directamente
  const caducidadProxima = obtenerCaducidadProxima(detalles);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">{caducidadProxima}</button>

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
