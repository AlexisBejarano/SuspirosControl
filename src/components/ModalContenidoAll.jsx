import React, { useState } from "react";
import ButtonDefault from "./ButtonDefault";

export default function ModalContenidoAll({ modalType, modalData }) {
  // Estado para el input de número
  const [number, setNumber] = useState(0);

  const handleDecrease = () => {
    setNumber((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleIncrease = () => {
    setNumber((prev) => prev + 1);
  };
  
  switch (modalType) {
    case "agregarProducto":
      return {
        titulo: "Agregar Producto",
        contenido: (
        <>
          <label htmlFor="AgregarProductoNombre" className="relative block rounded-md border border-gray-200 shadow-xs">
            <input type="text" id="AgregarProductoNombre" placeholder="AgregarProductoNombre" className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              <strong>Nombre Producto</strong>
            </span>
          </label>
          <label htmlFor="AgregarUdMedida" className="relative block mt-3 rounded-md border border-gray-200 shadow-xs">
            <input type="text" id="AgregarUdMedida" placeholder="AgregarUdMedida" className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
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
        ),
      };
    case "generarReporte":
      return {
        titulo: "Generar Reporte",
        contenido: (
          <div>
            <h1>Opciones para generar un reporte</h1>
          </div>
        ),
      };
    case "cerrarSesion":
      return {
        titulo: "Cerrar Sesión",
        contenido: (
          <div>
            <h1>¿Estás seguro de que deseas cerrar sesión?</h1>
          </div>
        ),
      };
    case "caducidad":
      return {
        titulo: "Detalles de Caducidad",
        contenido: (
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
                {modalData.map((lote, index) => (
                  <tr key={index} className="bg-white border-b-1 border-b-gray-200">
                    <td className="px-4 py-2 text-center border-x-2 border-x-gray-200">{lote.lote}</td>
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{lote.cantidad}</td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">
                      <ButtonDefault textButton={new Date(lote.caducidad).toISOString().split("T")[0]} bgButton={"bg-gray-500"} hoverBgButton={"hover:bg-gray-700"} widthButton={"w-40"} marginButton={"mx-1"} colorButton={"text-white"}
                        modalType="caducidadEditar" // Tipo de modal
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      };
      case "caducidadEditar":
      return {
        titulo: "Editar Caducidad",
        contenido: (
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
                    <td className="px-4 py-2 text-center border-x-2 border-x-gray-200">aaa</td>
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">aaa</td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">aa</td>
                  </tr>
              </tbody>
            </table>
          </div>
        ),
      };
    default:
      return {
        titulo: "Titulo no definido",
        contenido: <div>Contenido no definido</div>,
      };
  }
}