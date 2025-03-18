import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalCaducidadEditar() {
    //INICIO PARA DATE SELECCIONAR FECHA--------------------------------
    const [selectedDate, setSelectedDate] = useState(null);
    //FIN PARA DATE SELECCIONAR FECHA--------------------------------
  return (
    <>
      <label className="block mt-3 text-gray-400 font-semibold mb-2">Fecha Caducidad:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="YYYY/MM/DD"
        className="border border-gray-300 p-2 h-10 rounded text-gray-700 focus:ring-0 focus:outline-hidden"
        placeholderText="Caducidad"
      />
    </>
  );
}