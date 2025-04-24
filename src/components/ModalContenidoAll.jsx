import React from "react";
import ButtonDefault from "./ButtonDefault";



import ModalAgregarProducto from "./modalComponents/ModalAgregarProducto";
import ModalGenerarReporte from "./modalComponents/modalGenerarReporte";
import ModalCaducidad from "./modalComponents/modalCaducidad";
import ModalCaducidadEditar from "./modalComponents/modalCaducidadEditar";
import ModalCerrarSesion from "./modalComponents/modalCerrarSesion";
import ModalEditarProducto from "./modalComponents/modalEditarProducto";
import ModalEliminarProducto from "./modalComponents/modalEliminarProducto";
import ModalRegistrarEntrada from "./modalComponents/modalRegistrarEntrada";
import ModalRegistrarSalida from "./modalComponents/modalRegistrarSalida";
import ModalSalidaLote from "./modalComponents/modalSalidaLote";


export default function ModalContenidoAll({ modalType, modalData, onClose, setIsOpen }) {

  switch (modalType) {
    case "agregarProducto":
      return {
        titulo: "Agregar Producto",
        contenido: (
          <>
            <ModalAgregarProducto onClose={() => setIsOpen(false)}/>
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
            <ModalRegistrarEntrada modalData={modalData} onClose={() => setIsOpen(false)}/>
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
            <ModalRegistrarSalida modalData={modalData} onClose={() => setIsOpen(false)}/>
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
            <ModalSalidaLote modalData={modalData} onClose={() => setIsOpen(false)}/>
          </>
        ),
        buttons: (
          <>
          </>
        ),
      };

    case "caducidad":
      return {
        titulo: "Detalles de Caducidad",
        contenido: (
          <>
            <ModalCaducidad modalData={modalData} />
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

    case "caducidadEditar":
      return {
        titulo: "Editar Caducidad",
        contenido: (
          <>
            <ModalCaducidadEditar modalData={modalData} />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
            <button onClick={() => setIsOpen(false)} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
            <ModalEditarProducto />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
            <button onClick={() => setIsOpen(false)} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
            <ModalEliminarProducto />
          </>
        ),
        buttons: (
          <>
            <ButtonDefault textButton={"Aceptar"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-24"} paddingButtonX={"px-4"} paddingButtonY={"py-2"} marginButton={"mx-1"} colorButton={"text-white"}
              modalType="ButtonActionAceptar" />
            <button onClick={() => setIsOpen(false)} className="w-24 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
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
            <ModalAlert onAceptar={async () => {
              setLoading(true);
              try {
                let url = "";
              let metodo = "POST";

              const res = await fetch(url, {
                method: metodo,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(modalData),
              });

              const data = await res.json();

              if (res.ok) {
                alert("Acción realizada exitosamente.");
                setIsOpen(false); // cerrar modal alerta
                if (modalData?.onSuccess) modalData.onSuccess(); // cerrar modal padre
                if (modalData?.onActualizar) modalData.onActualizar(); // actualizar tabla
              } else {
                alert("Error: " + (data.message || "Error desconocido."));
              }
            } catch (error) {
              console.error(error);
              alert("Error de red o del servidor.");
            } finally {
              setLoading(false);
            }
          }}
          loading={loading}
        />
      </>
        ),
        buttons: loading ? null : ( // ocultar botones mientras carga
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