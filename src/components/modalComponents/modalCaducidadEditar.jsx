import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalCaducidadEditar({ modalData, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleOpenConfirmModal = () => {
    if (!selectedDate) {
      setErrorMessage("La fecha de caducidad es obligatoria.");
      return;
    }

    setErrorMessage(""); // Limpiar errores
    setShowConfirmModal(true);
  };

  const handleRegistrarCaducidad = async () => {
    const token = getCookie("token");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/detalles/${modalData.id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ caducidad: selectedDate }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Caducidad actualizada correctamente.");
        setErrorMessage(""); // Limpiar errores
        onClose(); // Cierra el modal después de la acción
      } else {
        alert("Error al actualizar la caducidad: " + (data.message || response.status));
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
      <h3 className="text-center">Caducidad Actual:<br /><strong>{formatDate(modalData?.caducidad) || "N/A"}</strong></h3>

      <label className="block mt-2 text-gray-400 font-semibold mb-2">Fecha Caducidad:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()} // Opcional: no permitir fechas pasadas
        className="border border-gray-300 p-2 h-10 rounded text-gray-700 focus:ring-0 focus:outline-hidden"
        placeholderText="Caducidad"
      />

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
                await handleRegistrarCaducidad();
                setShowConfirmModal(false); // Cierra el modal de alerta
              }}
              onCancelar={() => setShowConfirmModal(false)} // Cierra solo el modal de alerta
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
