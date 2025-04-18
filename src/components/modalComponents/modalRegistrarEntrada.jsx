import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalRegistrarEntrada({ modalData }) {
  
  //INICIO PARA DATE SELECCIONAR FECHA--------------------------------
  const [selectedDate, setSelectedDate] = useState(null);
  //FIN PARA DATE SELECCIONAR FECHA--------------------------------

  return (
    <>
      <hr className="mb-2 mt-1"/>
          <h3><strong>{modalData?.nombre || "No disponible"}</strong></h3>
          <h3><i>{modalData?.unidad || "No disponible"}</i></h3>
      <label htmlFor="AgregarLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input type="text" id="AgregarLote" placeholder="AgregarLote" className="peer border-none h-10 w-full px-2  bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Lote</strong>
        </span>
      </label>
      <label htmlFor="AgregarCantidadLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input type="text" id="AgregarCantidadLote" placeholder="AgregarCantidadLote" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Cantidad</strong>
        </span>
      </label>
      <label className="block mt-3 text-gray-400 font-semibold mb-2">Fecha Caducidad:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()} // Opcional: no permitir fechas pasadas
        className="border border-gray-300 p-2 h-10 rounded text-gray-700 focus:ring-0 focus:outline-hidden"
        placeholderText="Caducidad"
      />
    </>
  );
}