import React from "react";

export default function modalSalidaLote() {
  return (
    <>
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
            <tr className="bg-white border-b-1 border-b-gray-200">
              <td className="px-1 text-center border-r-2 border-r-gray-200">aaa</td>
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">aaa</td>
              <td className="px-1 text-center border-r-2 border-r-gray-200">aaa</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-auto text-center text-sm mt-2">
        <div className="text-gray-400 py-1">
          <strong>Retirar:</strong>
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