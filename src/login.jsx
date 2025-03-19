import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3001/usuarios";
const cookies = new Cookies();

export default function Login() {
    // Hook para redireccionar

    // Usamos useState para manejar el estado del formulario
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    // Función para manejar los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    // Función para iniciar sesión
    const iniciarSesion = async () => {
        try {
            const response = await axios.get(baseUrl, {
                params: {
                    username: form.username,
                    password: form.password
                }
            });

            // Verifica si response.data existe y tiene al menos un elemento
            if (response.data && response.data.length > 0) {
                let respuesta = response.data[0];
                cookies.set("id", respuesta.id, { path: "/" });
                cookies.set("username", respuesta.username, { path: "/" });
                window.location.href = '/app';
            } else {
                alert("El usuario o la contraseña no son correctos");
            }
        } catch (error) {
            console.log(error);
            alert("Ocurrió un error al iniciar sesión");
        }
    };

    return (
        <>
            <div className="bg-neutral-300 items-center p-4">
                <div className="max-w-sm space-y-3 m-auto bg-neutral-500 p-10 rounded-lg">
                    <div className="text-center text-black">
                        <h1>Suspiros Control</h1>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Enter name"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Enter password"
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                            </svg>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={iniciarSesion} // Llamamos directamente a la función
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Acceder
                    </button>
                </div>
            </div>
        </>
    );
}