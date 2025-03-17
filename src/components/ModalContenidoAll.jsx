import React, { useState } from "react";
import ButtonDefault from "./ButtonDefault";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import modalAgregarProducto from "./modalComponents/modalAgregarProducto";
import modalGenerarReporte from "./modalComponents/modalGenerarReporte";
import modalAlert from "./modalComponents/modalAlerta";
import modalCaducidad from "./modalComponents/modalCaducidad";
import modalCaducidadEditar from "./modalComponents/modalCaducidadEditar";
import modalCerrarSesion from "./modalComponents/modalCerrarSesion";
import modalEditarProducto from "./modalComponents/modalEditarProducto";
import modalEliminarProducto from "./modalComponents/modalEliminarProducto";
import modalRegistrarEntrada from "./modalComponents/modalRegistrarEntrada";
import modalRegistrarSalida from "./modalComponents/modalRegistrarSalida";
import modalSalidaLote from "./modalComponents/modalSalidaLote";


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
            <modalAgregarProducto />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
          <>
            <modalGenerarReporte />
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

    case "cerrarSesion":
      return {
        titulo: "Cerrar Sesión",
        contenido: (
          <>
            <modalCerrarSesion />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
            <modalRegistrarEntrada />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
          <>
            <modalRegistrarSalida />
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

    case "SalidaLote":
      return {
        titulo: "Salida de Lote",
        contenido: (
          <>
            <modalSalidaLote />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
            <modalCaducidad />
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
            <modalCaducidadEditar />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
            <modalEditarProducto />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
          <>
            <modalEliminarProducto />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
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
            <modalAlert />
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