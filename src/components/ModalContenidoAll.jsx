import React from "react";

export default function ModalContenidoAll({ modalType, modalData }) {
  switch (modalType) {
    case "agregarProducto":
      return {
        titulo: "Agregar Producto",
        contenido: (
          <div>
            <h1>Formulario para agregar un nuevo producto</h1>
          </div>
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
                      <button
                        onClick={() => alert(`Modificar fecha de caducidad del lote ${lote.lote}`)}
                        className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition"
                      >
                        {new Date(lote.caducidad).toISOString().split("T")[0]}
                      </button>
                    </td>
                  </tr>
                ))}
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