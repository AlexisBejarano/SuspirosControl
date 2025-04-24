import React, { useState } from "react";
import ModalAlerta from "./modalAlerta";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function ModalAgregarProducto({ onClose }) {

    const [nombre, setNombre] = useState("");
    const [unidad, setUnidad] = useState("");
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDecrease = () => {
        setNumber((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleIncrease = () => {
        setNumber((prev) => prev + 1);
    };

    const handleOpenConfirmModal = () => {
        const regex = /^[a-zA-Z0-9\s]+$/;

        if (!nombre.trim() || !unidad.trim()) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        if (!regex.test(nombre) || !regex.test(unidad)) {
            setErrorMessage("Solo se permiten letras, números y espacios.");
            return;
        }

        setErrorMessage("");
        setShowConfirmModal(true);
    };


    const handleAgregarProducto = async () => {
        const token = getCookie("token");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/producto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre,
                    unidad,
                    stock: 0,
                    aviso_stock: number,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setNombre("");
                setUnidad("");
                setNumber(0);
                setShowConfirmModal(false);
                setErrorMessage("");
                if (onClose) onClose();
            } else {
                alert("Error al agregar producto: " + (data.message || response.status));
            }
        } catch (error) {
            console.error("Error al enviar el producto:", error);
            alert("Ocurrió un error al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <label htmlFor="AgregarProductoNombre" className="relative mt-3 block rounded-md border border-gray-300 shadow-xs">
                <input type="text" id="AgregarProductoNombre" placeholder="AgregarProductoNombre" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    <strong>Nombre Producto</strong>
                </span>
            </label>
            <label htmlFor="AgregarUdMedida" className="relative block mt-3 rounded-md border border-gray-300 shadow-xs">
                <input type="text" id="AgregarUdMedida" placeholder="AgregarUdMedida" className="peer border-none h-10 w-full px-2 bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                    <strong>Unidad Medida</strong>
                </span>
            </label>

            <div className="mx-auto text-center text-sm mt-2">
                <div className="text-gray-400 py-1">
                    <strong>Aviso Stock</strong>
                </div>
                <div>
                    <button onClick={handleDecrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-l">
                        -
                    </button>
                    <input type="number" style={{ WebkitAppearance: "none", MozAppearance: "textfield" }} value={number} onChange={(e) => setNumber(parseInt(e.target.value))} className="border-y-2 border-gray-300 text-center w-20 appearance-none focus:outline-none h-9" />
                    <button onClick={handleIncrease} className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-r" >
                        +
                    </button>
                </div>
            </div>
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
                            onAceptar={handleAgregarProducto}
                            onCancelar={() => setShowConfirmModal(false)}
                            loading={loading}
                        />
                    </div>
                </div>
            )}
        </>
    );
}