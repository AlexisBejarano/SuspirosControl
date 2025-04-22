import React from "react";

export default function ModalAlerta({ onAceptar, onCancelar, loading }) {
    return (
        <>
            <center><img width="48" height="48" src="https://img.icons8.com/color/48/high-priority.png" alt="high-priority" /></center>
            <h1 className="my-2">¿Seguro de realizar la acción?</h1>
            <div className="mt-4 text-center space-x-2">
                <button
                    onClick={onAceptar}
                    disabled={loading}
                    className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-800'}`}
                >
                    {loading ? "Procesando..." : "Aceptar"}
                </button>
                {!loading && (
                    <button
                        onClick={onCancelar}
                        className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </>
    );
}