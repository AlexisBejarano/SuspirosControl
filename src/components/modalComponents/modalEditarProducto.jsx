import React, { useState, useEffect } from "react";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalEditarProducto({ modalData, onClose }) {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [avisoStock, setAvisoStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Verificar si modalData es válido antes de inicializar el estado
  useEffect(() => {
    if (modalData) {
      setNombre(modalData?.nombre || "");
      setUnidad(modalData?.unidad || "");
      setAvisoStock(Number(modalData?.aviso_stock) || 0);
    }
  }, [modalData]);

  const handleOpenConfirmModal = () => {
    if (!nombre.trim() || !unidad.trim()) {
      setErrorMessage("Nombre y Unidad de Medida son obligatorios.");
      return;
    }

    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const handleEditarProducto = async () => {
    if (!modalData || !modalData.id) {
      alert("Error: modalData no está disponible.");
      return;
    }

    const token = getCookie("token");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/producto/${modalData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          unidad,
          aviso_stock: avisoStock,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Producto actualizado correctamente.");
        setShowConfirmModal(false);
        setErrorMessage("");
        if (onClose) onClose();
      } else {
        alert("Error al actualizar producto: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = () => {
    setAvisoStock((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleIncrease = () => {
    setAvisoStock((prev) => prev + 1);
  };

  return (
    <>
      <label className="relative block rounded-md border border-gray-300 shadow-xs">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre Producto"
          className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-none"
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Nombre Producto</strong>
        </span>
      </label>

      <label className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
        <input
          type="text"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
          placeholder="Unidad de Medida"
          className="peer border-none h-10 px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-none"
        />
        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
          <strong>Unidad Medida</strong>
        </span>
      </label>

      <div className="text-center mt-4">
        <div className="text-gray-400 mb-1">
          <strong>Aviso Stock</strong>
        </div>
        <div>
          <button onClick={handleDecrease} className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-l">
            -
          </button>
          <input
            type="number"
            value={avisoStock}
            onChange={(e) => setAvisoStock(parseInt(e.target.value))}
            className="w-20 text-center border-y-2 border-gray-300 h-9 appearance-none focus:outline-none"
          />
          <button onClick={handleIncrease} className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-r">
            +
          </button>
        </div>
      </div>

      {errorMessage && <p className="mt-2 text-center text-sm text-red-500">{errorMessage}</p>}

      <div className="mt-5 text-center space-x-2">
        <button
          onClick={handleOpenConfirmModal}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800'}`}
        >
          {loading ? "Guardando..." : "Aceptar"}
        </button>
        <button onClick={onClose} className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded">
          Cancelar
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ModalAlerta
              onAceptar={async () => {
                await handleEditarProducto();
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
