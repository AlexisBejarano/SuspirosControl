import React from "react";
import ButtonDefault from "../ButtonDefault";

export default function ModalRegistrarSalida({ modalData }) {

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
          {modalData?.detalle_productos?.map((detalle) => (
            <tr key={detalle.id} className="bg-white border-b-1 border-b-gray-200">
              <td className="px-1 text-center border-r-2 border-r-gray-200">
                <ButtonDefault textButton={detalle.lote || "N/A"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-20"} paddingButtonX={"px-4"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-black"}
                  modalType="SalidaLote"
                />
              </td>
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{detalle.cantidad || "N/A"}</td>
              <td className="px-1 text-center border-r-2 border-r-gray-200">{formatDate(detalle.caducidad)}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}