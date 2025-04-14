import React, { useState } from "react";

export default function ModalSalidaLote({ modalData }) {

    // Formatear la fecha para mostrarla mejor
    const formatDate = (dateString) => {
      if (!dateString) return "Sin fecha";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };

    // INICIO PARA AVISO STOCK ---------------------------------------------
    // Estado para el input de número
    const [number, setNumber] = useState(0);
  
    const handleDecrease = () => {
      setNumber((prev) => (prev > 0 ? prev - 1 : prev));
    };
  
    const handleIncrease = () => {
      setNumber((prev) => prev + 1);
    };
    // FIN PARA AVISO STOCK ---------------------------------------------
  
  
  return (
    <>
    <hr className="mb-2 mt-1"/>
          <h3><strong>{modalData?.productoNombre || "No disponible"}</strong></h3>
          <h3><i>{modalData?.productoUnidad || "No disponible"}</i></h3>
      <div className="flex items-center mt-3">
        <table className="mx-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-2 border-r-1">Lote</th>
              <th className="py-3 px-2 border-r-1">Cantidad</th>
              <th className="py-3 px-2 border-r-1">Caducidad</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b-1 border-b-gray-200">
              <td className="px-2 text-center border-r-2 border-r-gray-200">{modalData?.lote || "N/A"}</td>
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{modalData?.cantidad || "N/A"}</td>
              <td className="px-2 text-center border-r-2 border-r-gray-200">{formatDate(modalData?.caducidad)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-auto text-center text-sm mt-2">
        <div className="text-gray-400 py-1">
          <strong>Cantidad a retirar:</strong>
        </div>
        <div>
          <button onClick={handleDecrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-l">
            -
          </button>
          <input type="number" style={{ WebkitAppearance: "none", MozAppearance: "textfield" }} value={number} onChange={(e) => setNumber(parseInt(e.target.value))} className="border-y-2 border-gray-300 text-center w-20 appearance-none focus:outline-none h-9" />
          <button onClick={handleIncrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-r" >
            +
          </button>
        </div>
        {number > (modalData?.cantidad || 0) && (
          <p className="text-red-500 mt-2">No puedes retirar más de lo disponible</p>
        )}
      </div>
    </>
  );
}