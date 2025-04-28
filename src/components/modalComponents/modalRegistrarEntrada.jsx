import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalRegistrarEntrada({ modalData, onClose, onUpdateData }) {

  const [lote, setLote] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

   const handleOpenConfirmModal = () => {
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!lote.trim() || !cantidad.trim() || cantidad==0) {
        setErrorMessage("Todos los campos son obligatorios.");
        return;
    }

    if (!regex.test(lote) || !regex.test(cantidad)) {
        setErrorMessage("Solo se permiten letras, números y espacios.");
        return;
    }

    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const handleRegistrarEntrada = async () => {
    const token = getCookie("token");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/detalles/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          lote,
          productos: modalData.id,
          cantidad: parseInt(cantidad),
          caducidad: selectedDate.toISOString().split('T')[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLote("");
        setCantidad("");
        setSelectedDate(null);
        setErrorMessage("");
        if (onClose) onClose();
        if (onUpdateData) onUpdateData();
      } else {
        alert("Error al registrar la entrada: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error al registrar la entrada:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <hr className="mb-2 mt-1" />
      <h3><strong>{modalData?.nombre || "No disponible"}</strong></h3>
      <h3><i>{modalData?.unidad || "No disponible"}</i></h3>

      <label htmlFor="AgregarLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input
          type="text"
          id="AgregarLote"
          placeholder="AgregarLote"
          className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Lote</strong>
        </span>
      </label>

      <label htmlFor="AgregarCantidadLote" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input
          type="number"
          id="AgregarCantidadLote"
          placeholder="AgregarCantidadLote"
          className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Cantidad</strong>
        </span>
      </label>

      <label className="block mt-3 text-gray-400 font-semibold mb-2">Fecha Caducidad:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
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
              onAceptar={handleRegistrarEntrada}
              onCancelar={() => setShowConfirmModal(false)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
