import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalCaducidadEditar({ modalData }) {

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

    //INICIO PARA DATE SELECCIONAR FECHA--------------------------------
    const [selectedDate, setSelectedDate] = useState(null);
    //FIN PARA DATE SELECCIONAR FECHA--------------------------------
  return (
    <>
    <h3 className="text-center">Caducidad Actual:<br/><strong>{formatDate(modalData?.caducidad) || "N/A"}</strong></h3>
      <label className="block mt-2 text-gray-400 font-semibold mb-2">Fecha Caducidad:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="DD/MM/YYYY"
        className="border border-gray-300 p-2 h-10 rounded text-gray-700 focus:ring-0 focus:outline-hidden"
        placeholderText="Caducidad"
      />
    </>
  );
}