import React from "react";

import ModalAgregarProducto from "./modalComponents/modalAgregarProducto";
import ModalGenerarReporte from "./modalComponents/modalGenerarReporte";
import ModalCerrarSesion from "./modalComponents/modalCerrarSesion";
import ModalEditarProducto from "./modalComponents/modalEditarProducto";
import ModalRegistrarEntrada from "./modalComponents/modalRegistrarEntrada";
import ModalRegistrarSalida from "./modalComponents/modalRegistrarSalida";
import ModalSalidaLote from "./modalComponents/modalSalidaLote";
import ModalEditarDetalle from "./modalComponents/modalEditarDetalle";



export default function ModalContenidoAll({ modalType, modalData, onClose, setIsOpen, onUpdateData  }) {

  switch (modalType) {
    case "agregarProducto":
      return {
        titulo: "Agregar Producto",
        contenido: (
          <>
            <ModalAgregarProducto 
              onClose={() => setIsOpen(false)}
              onUpdateData={onUpdateData} // Pasamos la prop
            />
          </>
        ),
        buttons: (
          <>
          </>
        ),
      };

    case "generarReporte":
      return {
        titulo: "Generar Reporte",
        contenido: (
          <>
            <ModalGenerarReporte />
          </>
        ),
        buttons: (
          <>
            <button onClick={() => setIsOpen(false)} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
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
            <ModalCerrarSesion />
          </>
        ),
        buttons: (
          <>
            <button onClick={onClose} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Aceptar
            </button>
            <button onClick={() => setIsOpen(false)} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
            <ModalRegistrarEntrada 
              modalData={modalData} 
              onClose={() => setIsOpen(false)}
              onUpdateData={onUpdateData}
            />
          </>
        ),
        buttons: (
          <>
          </>
        ),
      };

    case "registrarSalida":
      return {
        titulo: "Registrar Salida",
        contenido: (
          <>
            <ModalRegistrarSalida modalData={modalData} onClose={() => setIsOpen(false)} onUpdateData={onUpdateData}/>
          </>
        ),
        buttons: (
          <>
            <button onClick={() => setIsOpen(false)} className="w-24 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
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
            <ModalSalidaLote
            modalData={modalData} 
            onClose={() => setIsOpen(false)}
            onUpdateData={onUpdateData}
            />
          </>
        ),
        buttons: (
          <>
          </>
        ),
      };

      case "detalleEditar":
      return {
        titulo: "Editar Detalles",
        contenido: (
          <>
            <ModalEditarDetalle modalData={modalData} onClose={() => setIsOpen(false)}/>
          </>
        ),
        buttons: (
          <>
        
          </>
        ),
      };

    case "editarProducto":
      return {
        titulo: "Editar Producto",
        contenido: (
          <>
            <ModalEditarProducto modalData={modalData} onClose={() => setIsOpen(false)} onUpdateData={onUpdateData}/>
          </>
        ),
        buttons: (
          <>
          </>
        ),
      };

    case "ButtonActionAceptar":
      return {
        titulo: "¡ALERTA!",
        contenido: (
          <>
            <ModalAlert />
      </>
        ),
        buttons: loading ? null : (
          <button onClick={() => setIsOpen(false)} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Cancelar
          </button>
        ),
      };

    default:
      return {
        titulo: "Titulo no definido",
        contenido: <div>Contenido no definido</div>,
      };
  }
}