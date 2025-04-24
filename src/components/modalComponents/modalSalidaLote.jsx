import React, { useState } from "react";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalSalidaLote({ modalData, onClose }) {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenConfirmModal = () => {

    if (number == 0) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (number  > modalData.cantidad) {
      return;
    }

    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const handleDecrease = () => {
    setNumber((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleRegistrarSalida = async () => {
    const token = getCookie("token");
    setLoading(true);

    if (number  <= 0) {
      alert("Debes ingresar una cantidad mayor a 0");
      return;
    }

    if (number  > modalData.cantidad) {
      alert("No puedes retirar más de lo disponible");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/detalles/editOutput/${modalData.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ cantidad: number }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
      } else {
        alert("Error al registrar la salida: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <hr className="mb-2 mt-1" />
      <h3><strong>{modalData?.productoNombre || "No disponible"}</strong></h3>
      <h3><i>{modalData?.productoUnidad || "No disponible"}</i></h3>

      <div className="flex items-center mt-3">
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
              <td className="px-2 text-center border-r-2 border-r-gray-200">{modalData?.lote || "N/A"}</td>
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{modalData?.cantidad || "N/A"}</td>
              <td className="px-2 text-center border-r-2 border-r-gray-200">{formatDate(modalData?.caducidad)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mx-auto text-center text-sm mt-2">
        <div className="text-gray-400 py-1">
          <strong>Cantidad a retirar:</strong>
        </div>
        <div>
          <button onClick={handleDecrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-l">
            -
          </button>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            className="border-y-2 border-gray-300 text-center w-20 appearance-none focus:outline-none h-9"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
          <button onClick={handleIncrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-r">
            +
          </button>
        </div>

        {number > (modalData?.cantidad || 0) && (
          <p className="text-red-500 mt-2">No puedes retirar más de lo disponible</p>
        )}

        <div className="mt-4 text-center space-x-2">
          <button
            onClick={handleOpenConfirmModal}
            disabled={loading}
            className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-800'}`}
          >
            {loading ? "Guardando..." : "Aceptar"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
          >
            Cancelar
          </button>
        </div>

        {errorMessage && (
          <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ModalAlerta
                onAceptar={async () => {
                  await handleRegistrarSalida();
                  onClose();
                  setShowConfirmModal(false);
                }}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
