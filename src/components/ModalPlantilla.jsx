import React from "react";

export default function Modal({ titulo, isOpen, onClose, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">{titulo}</h2>
        <div className="max-h-60 overflow-y-auto">{content}</div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">Cerrar</button>
      </div>
    </div>
  );
}