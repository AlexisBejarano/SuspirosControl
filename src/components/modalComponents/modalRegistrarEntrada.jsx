import React from "react";

export default function modalRegistrarEntrada() {
  return (
    <>
      <h3>Producto: aaa</h3>
      <h3>Unidad de medida: aaa</h3>
      <label htmlFor="AgregarLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input type="text" id="AgregarLote" placeholder="AgregarLote" className="peer border-none h-10 w-full px-2  bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Nombre</strong>
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
        dateFormat="YYYY/MM/DD"
        className="border border-gray-300 p-2 h-10 rounded text-gray-700 focus:ring-0 focus:outline-hidden"
        placeholderText="Caducidad"
      />
    </>
  );
}