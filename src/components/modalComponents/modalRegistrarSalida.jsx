import React, { useState, useRef, useEffect  } from "react";
import ButtonDefault from "../ButtonDefault";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalRegistrarSalida({ modalData, onUpdateData }) {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [openAccionId, setOpenAccionId] = useState(null);

  const accionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accionRef.current && !accionRef.current.contains(event.target)) {
        setOpenAccionId(null); // Cierra el acordeón
      }
    };
  
    if (openAccionId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAccionId]);
  

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleEliminarDetalle = async () => {
    if (!detalleSeleccionado) return;

    setLoading(true);
    const token = getCookie("token");

    try {
      const response = await fetch(`http://localhost:8080/detalles/${detalleSeleccionado.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setShowConfirmModal(false);
        setDetalleSeleccionado(null);
        if (onUpdateData) onUpdateData();
      } else {
        alert("Error al eliminar: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error al eliminar detalle:", error);
      alert("Ocurrió un error al intentar eliminar el detalle.");
    } finally {
      setLoading(false);
    }
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
                  <ButtonDefault
                    textButton={detalle.lote || "N/A"}
                    bgButton={"bg-green-500"}
                    hoverBgButton={"hover:bg-green-700"}
                    widthButton={"w-25"}
                    paddingButtonX={"px-4"}
                    paddingButtonY={"py-1"}
                    marginButton={"mx-1"}
                    colorButton={"text-black"}
                    modalType="SalidaLote"
                    modalData={{ ...detalle, productoNombre: modalData.nombre, productoUnidad: modalData.unidad }}
                    onUpdateData={onUpdateData}
                  />
                </td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{detalle.cantidad || "N/A"}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">{formatDate(detalle.caducidad)}</td>
                <td className="text-center px-1">
                  {/* Botón de engrane */}
                  {openAccionId !== detalle.id ? (
                    <button
                      onClick={() => setOpenAccionId(detalle.id)}
                      className="px-3 py-1 w-12 rounded bg-gray-700 hover:bg-gray-900 text-white"
                      title="Opciones"
                    >
                      ⚙️
                    </button>
                  ) : (
                    <div 
                    ref={accionRef}
                    className="flex justify-center items-center gap-1 transition-all duration-300">
                      <ButtonDefault
                        textButton={"✏"}
                        bgButton={"bg-blue-500"}
                        hoverBgButton={"hover:bg-blue-800"}
                        widthButton={"w-10"}
                        paddingButtonX={"px-2"}
                        paddingButtonY={"py-1"}
                        colorButton={"text-white"}
                        modalType="detalleEditar"
                        modalData={detalle}
                        onUpdateData={() => {
                          setOpenAccionId(null);
                          if (onUpdateData) onUpdateData();
                        }}
                      />
                      <button
                        onClick={() => {
                          setDetalleSeleccionado(detalle);
                          setShowConfirmModal(true);
                          setOpenAccionId(null); // cerrar acordeón
                        }}
                        className="px-2 py-1 w-10 rounded bg-red-700 hover:bg-red-900 text-white"
                        title="Eliminar"
                      >
                        🗑
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ModalAlerta
              onAceptar={handleEliminarDetalle}
              onCancelar={() => {
                setShowConfirmModal(false);
                setDetalleSeleccionado(null);
              }}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
