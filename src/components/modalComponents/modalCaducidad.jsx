import React from "react";
import ButtonDefault from "../ButtonDefault";

export default function ModalCaducidad() {
  return (
    <>
      <h3>Producto: aaa</h3>
      <div className="flex mt-5 items-center">
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
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={"aaa"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-40"} marginButton={"mx-1"} paddingButtonX={"px-4"} paddingButtonY={"py-1"} colorButton={"text-black"}
                    modalType="caducidadEditar"
                  />
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}