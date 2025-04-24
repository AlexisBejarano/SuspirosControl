import React, { useState } from "react";
import ButtonDefault from "../ButtonDefault";

export default function ModalRegistrarSalida({ modalData }) {

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };


  return (
    <>
      <hr className="mb-2 mt-1" />
      <h3><strong>{modalData?.nombre || "No disponible"}</strong></h3>
      <h3><i>{modalData?.unidad || "No disponible"}</i></h3>
      <div className="mt-3 max-h-96 overflow-y-auto w-full">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800 text-white text-sm">
              <th className="py-3 px-2 border-r-1">Lote</th>
              <th className="py-3 px-2 border-r-1">Cantidad</th>
              <th className="py-3 px-2 border-r-1">Caducidad</th>
              <th className="py-3 px-2 border-r-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {modalData?.detalle_productos?.map((detalle) => (
              <tr key={detalle.id} className="bg-white border-b-1 border-b-gray-200">
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={detalle.lote || "N/A"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-40"} paddingButtonX={"px-4"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-black"}
                    modalType="SalidaLote" modalData={{ ...detalle, productoNombre: modalData.nombre, productoUnidad: modalData.unidad }}
                  />
                </td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{detalle.cantidad || "N/A"}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">{formatDate(detalle.caducidad)}</td>
                <td className="text-center min-w-28">
                  <ButtonDefault textButton={"✏"} bgButton={"bg-blue-500"} hoverBgButton={"hover:bg-blue-800"} widthButton={"w-12"} marginButton={"ml-1"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} colorButton={"text-white"}
                    modalType="editarProducto"
                  />
                  <ButtonDefault textButton={"🗑"} bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-12"} marginButton={"mx-1"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} colorButton={"text-white"}
                    modalType="eliminarProducto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}