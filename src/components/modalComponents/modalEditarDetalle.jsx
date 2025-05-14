import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalEditarDetalle({ modalData, onClose, onUpdateData }) {
  const [lote, setLote] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (modalData) {
      setLote(modalData?.lote || "");
      setCantidad(modalData?.cantidad || 0);
      setSelectedDate(modalData?.caducidad ? new Date(modalData.caducidad) : new Date());
    }
  }, [modalData]);

  const handleOpenConfirmModal = () => {
    const regexCantidad = /^[a-zA-Z0-9\s]+$/;
    const regexLote = /^[a-zA-Z0-9\s.]+$/;

    if (!regexLote.test(lote)) {
      setErrorMessage("El lote solo puede contener letras, números, espacios y puntos.");
      return;
  }

  if (!regexCantidad.test(cantidad)) {
      setErrorMessage("La cantidad solo puede contener números enteros positivos.");
      return;
  }

    if (!lote.trim()) {
      setErrorMessage("El campo Lote es obligatorio.");
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum)) {
      setErrorMessage("La cantidad debe ser un número válido.");
      return;
    }

    if (cantidadNum <= 0) {
      setErrorMessage("La cantidad debe ser mayor a cero.");
      return;
    }

    if (!selectedDate) {
      setErrorMessage("Debe seleccionar una fecha de caducidad.");
      return;
    }
    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const handleEditarDetalle = async () => {
    if (!modalData || !modalData.id) {
      alert("Error: modalData no está disponible.");
      return;
    }

    const token = getCookie("token");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/detalles/${modalData.id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lote,
          productos: modalData.id_producto,
          cantidad: parseInt(cantidad),
          caducidad: selectedDate.toISOString().split("T")[0],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowConfirmModal(false);
        if (onClose) onClose();
        if (onUpdateData) onUpdateData();
      } else {
        alert("Error al actualizar detalle: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <label className="relative block rounded-md border border-gray-300 shadow-xs mt-2">
        <input
          type="text"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
          placeholder="Lote"
          className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-none"
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Lote</strong>
        </span>
      </label>

      <label className="relative block rounded-md border border-gray-300 shadow-xs mt-3">
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
          className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-none"
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

      {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}

      <div className="mt-5 text-center space-x-2">
        <button
          onClick={handleOpenConfirmModal}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800'}`}
        >
          {loading ? "Guardando..." : "Aceptar"}
        </button>
        <button onClick={onClose} className="px-6 py-2 bg-[#8a1329] hover:bg-[#550b19] text-white rounded">
          Cancelar
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ModalAlerta
              onAceptar={async () => {
                await handleEditarDetalle();
                setShowConfirmModal(false);
              }}
              onCancelar={() => setShowConfirmModal(false)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
