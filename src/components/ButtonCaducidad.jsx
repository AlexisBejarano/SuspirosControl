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
        content={
          <div className="flex items-center">
            <table className="mx-auto">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-2 border-r-1">Lote</th>
                  <th className="py-3 px-2 border-r-1">Cantidad</th>
                  <th className="py-3 px-2 border-r-1">Caducidad</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((lote, index) => (
                  <tr key={index} className="bg-white border-b-1 border-b-gray-200">
                    <td className="px-4 py-2 text-center border-x-2 border-x-gray-200">{lote.lote}</td>
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{lote.cantidad}</td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">

                      {/* FALTA HACER QUE CUANDO DEN CLIC AL BOTON SE ABRA OTRO MODAL ENZIMA PARA MODIFICAR LA FECHA DE ESE LOTE */}
                      <button onClick={() => setIsOpen(true)} className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                      {new Date(lote.caducidad).toISOString().split("T")[0]}
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
    </>
  );
}

