// componentes/modalComponents/modalManual.jsx

import React from "react";

export default function ModalManual({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg">
        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Manual de Usuario</h2>

        {/* Sección 1 */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Buscar Producto</h3>
          <p className="text-gray-700">
            Usa la barra de búsqueda para encontrar productos por nombre o
            clave.
          </p>
          <img
            src="/img/manual-busqueda.png"
            alt="Buscar producto"
            className="mt-2 rounded-md border border-gray-200 shadow-sm"
          />
        </section>

        {/* Sección 2 */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Agregar al carrito</h3>
          <p className="text-gray-700">
            Haz clic en el botón "Agregar" para incluir productos en tu carrito.
          </p>
          <img
            src="/img/manual-carrito.png"
            alt="Agregar al carrito"
            className="mt-2 rounded-md border border-gray-200 shadow-sm"
          />
        </section>

        {/* Agrega más secciones aquí */}
      </div>
    </div>
  );
}
