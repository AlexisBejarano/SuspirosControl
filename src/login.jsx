import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {
    const [form, setForm] = useState({
        nombre: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const iniciarSesion = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/usuario/login', {
                nombre: form.nombre,
                password: form.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            });
    
            if (response.data.token) {
                cookies.set('token', response.data.token, { path: '/' });
                cookies.set('id', 1, { path: '/' });
                cookies.set('nombre', form.nombre, { path: '/' });
                window.location.href = '/app';
            } else {
                alert(response.data.message || "El usuario o la contraseña no son correctos");
            }
        } catch (error) {
            console.log(error);
            alert("Ocurrió un error al iniciar sesión");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (cookies.get('token')) {
            window.location.href = '/app';
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ddd2c5] to-[#FFFF]">
            <div className="bg-white/60 p-8 rounded-2xl shadow-xl max-w-sm w-full relative">
                <div className="absolute flex items-center justify-center pb-3 -top-14 shadow-lg shadow-gray-300 left-1/2 transform -translate-x-1/2 w-30 h-30 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                    <img src="../public/img/suspiros-red.png" alt="Logo" className="w-30 h-15" />
                </div>
                <h1 className="text-center text-2xl font-semibold text-gray-700 mt-12 bold">Suspiros Control</h1>
                <div className="mt-6">
                    <div className="relative">
                        <input
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                            className="w-full py-3 px-4 pl-12 bg-gray-100 border-2 border-[#34070a] rounded-lg focus:ring-0 outline-none"
                            placeholder="User"
                        />
                        <div className="absolute left-4 top-3 text-gray-500">
                            <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className="relative mt-4">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full py-3 px-4 pl-12 bg-gray-100 border-2 border-[#34070a] rounded-lg  focus:ring-0 outline-none"
                            placeholder="Password"
                        />
                        <div className="absolute left-4 top-3 text-gray-500">
                            <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                                <circle cx="16.5" cy="7.5" r=".5"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-gray-600">Remember me</label>
                    </div>
                    <button
                        onClick={iniciarSesion}
                        disabled={loading}
                        className={`w-full mt-6 p-2 text-white py-3 rounded-lg text-lg font-semibold transition ${
                            loading
                                ? "bg-gradient-to-r from-[#34070a] to-[#34070a] cursor-not-allowed"
                                : "bg-gradient-to-r from-[#8a1329] to-[#680f1f] hover:from-[#680f1f] hover:to-[#8a1329] hover:border-2 hover:p-2.5"}`}
                    >
                        {loading ? "Procesando..." : "Acceder"}
                    </button>
                </div>
            </div>
        </div>
    );
}