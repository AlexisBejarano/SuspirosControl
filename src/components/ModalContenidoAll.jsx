import React, { useState } from "react";
import ButtonDefault from "./ButtonDefault";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalContenidoAll({ modalType, modalData, onClose }) {

  // INICIO PARA AVISO STOCK ---------------------------------------------
    // Estado para el input de número
    const [number, setNumber] = useState(0);

    const handleDecrease = () => {
      setNumber((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleIncrease = () => {
      setNumber((prev) => prev + 1);
    };
  // FIN PARA AVISO STOCK ---------------------------------------------

  //INICIO PARA DATE SELECCIONAR FECHA--------------------------------
    const [selectedDate, setSelectedDate] = useState(null);
  //FIN PARA DATE SELECCIONAR FECHA--------------------------------


  switch (modalType) {
    case "agregarProducto":
      return {
        titulo: "Agregar Producto",
        contenido: (
        <>
          <label htmlFor="AgregarProductoNombre" className="relative mt-3 block rounded-md border border-gray-300 shadow-xs">
            <input type="text" id="AgregarProductoNombre" placeholder="AgregarProductoNombre" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              <strong>Nombre Producto</strong>
            </span>
          </label>
          <label htmlFor="AgregarUdMedida" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
            <input type="text" id="AgregarUdMedida" placeholder="AgregarUdMedida" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
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
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

    case "generarReporte":
      return {
        titulo: "Generar Reporte",
        contenido: (
          <div>
            <h1>Se esta generando el reporte.</h1>
          </div>
        ),
        buttons: (
          <>
            <button onClick={onClose} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
              Aceptar
            </button>
          </>
        ),
      };

    case "cerrarSesion":
      return {
        titulo: "Cerrar Sesión",
        contenido: (
          <>
            <h1>¿Estás seguro de que deseas cerrar sesión?</h1>
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "registrarEntrada":
      return {
        titulo: "Registrar Entrada",
        contenido: (
          <>
            <h3>Producto: aaa</h3>
            <h3>Unidad de medida: aaa</h3>
            <label htmlFor="AgregarLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
              <input type="text" id="AgregarLote" placeholder="AgregarLote" className="peer border-none h-10 w-full px-2  bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                <strong>Nombre</strong>
              </span>
            </label>
            <label htmlFor="AgregarCantidadLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
              <input type="text" id="AgregarCantidadLote" placeholder="AgregarCantidadLote" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
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
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "registrarSalida":
      return {
        titulo: "Registrar Saldia",
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
                    <td className="px-1 text-center border-r-2 border-r-gray-200">
                      <ButtonDefault textButton={"aaa"} bgButton={"bg-green-100"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-20"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"}  colorButton={"text-black"}                        modalType="SalidaLote"
                      />
                    </td>
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">aaa</td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">aaa</td>
                  </tr>
              </tbody>
            </table>
          </div>
        ),
        buttons: (
          <>
            <button onClick={onClose} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Aceptar
            </button>
          </>
        ),
      };
      case "SalidaLote":
      return {
        titulo: "Salida de Lote",
        contenido: (
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
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "caducidad":
      return {
        titulo: "Detalles de Caducidad",
        contenido: (
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
                  {modalData.map((lote, index) => (
                    <tr key={index} className="bg-white border-b-1 border-b-gray-200">
                      <td className="px-4 py-2 text-center border-x-2 border-x-gray-200">{lote.lote}</td>
                      <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{lote.cantidad}</td>
                      <td className="px-1 text-center border-r-2 border-r-gray-200">
                        <ButtonDefault textButton={new Date(lote.caducidad).toISOString().split("T")[0]} bgButton={"bg-green-100"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-40"} marginButton={"mx-1"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} colorButton={"text-black"}
                          modalType="caducidadEditar"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ),
        buttons: (
          <>
            <button onClick={onClose} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Aceptar
            </button>
          </>
        ),
      };

      case "caducidadEditar":
      return {
        titulo: "Editar Caducidad",
        contenido: (
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
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "editarProducto":
      return {
        titulo: "Editar Producto",
        contenido: (
          <>
          <label htmlFor="AgregarProductoNombre" className="relative block rounded-md border border-gray-300 shadow-xs">
            <input type="text" id="AgregarProductoNombre" placeholder="AgregarProductoNombre" className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"/>
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              <strong>Nombre Producto</strong>
            </span>
          </label>
          <label htmlFor="AgregarUdMedida" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
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
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "eliminarProducto":
      return {
        titulo: "Eliminar Producto",
        contenido: (
          <div>
            <h1>¿Seguro que desea Eliminar?</h1>
          </div>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-200"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="ButtonActionAceptar"/>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };

      case "ButtonActionAceptar":
      return {
        titulo: "¡ALERTA!",
        contenido: (
          <>
            <h1>¿Seguro de realizar la acción?</h1>
          </>
        ),
        buttons: (
          <>
            <button onClick={onClose} className="w-24 mr-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Aceptar
            </button>
            <button onClick={onClose} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Cancelar
            </button>
          </>
        ),
      };
      
    default:
      return {
        titulo: "Titulo no definido",
        contenido: <div>Contenido no definido</div>,
      };
  }
}