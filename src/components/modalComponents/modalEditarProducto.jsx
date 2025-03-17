import React from "react";

export default function modalEditarProducto() {
  return (
    <>
      <label htmlFor="AgregarProductoNombre" className="relative block rounded-md border border-gray-300 shadow-xs">
        <input type="text" id="AgregarProductoNombre" placeholder="AgregarProductoNombre" className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Nombre Producto</strong>
        </span>
      </label>
      <label htmlFor="AgregarUdMedida" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input type="text" id="AgregarUdMedida" placeholder="AgregarUdMedida" className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden" />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Unidad Medida</strong>
        </span>
      </label>
      <div className="mx-auto text-center text-sm mt-2">
        <div className="text-gray-400 py-1">
          <strong>Aviso Stock</strong>
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
      </div>
    </>
  );
}