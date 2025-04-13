import React, { useState, useEffect } from "react";
import ButtonDefault from "./components/ButtonDefault"
import Cookies from "universal-cookie";

const cookies = new Cookies();
const TableComponent = () => {
const [productos, setProductos] = useState([]);


  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("token", { path: "/" });
    window.location.href = '/'; 
  };

  /*
  // Función para obtener la fecha de caducidad más próxima
  const obtenerCaducidadProxima = (detalles) => {
    const fechas = detalles.map((lote) => new Date(lote.caducidad));
    return fechas.length ? new Date(Math.min(...fechas)).toISOString().split("T")[0] : "N/A";
  };
  */

  /*
  // Handlers para las acciones
  const handleEditar = (id) => alert(`Editar producto con ID: ${id}`);
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos((prev) => prev.map((group) => ({
        ...group,
        productos: group.productos.filter((item) => item.id !== id),
      })));
    }
  };
  */

  // Redirigir si ya hay una sesión activa
  useEffect(() => {
    if (!cookies.get('token')) {
        window.location.href = '/';
    }
}, []);


// CODIGO PARA GET AL SERVIDOR TOMANDO COMO CABECERA EL TOKEN

useEffect(() => {
  const fetchData = async () => {
    const token = cookies.get("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/todo", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      setProductos(data.data); // Puedes comentar esto si solo quieres mostrar en consola

    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    }
  };

  fetchData();
}, []);



  return (
    <>
      <div className="items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 h-screen">
        <div className="m-auto max-w-xl flex justify-center gap-2">
          {/* Botón 1: Agregar Producto */}
          <ButtonDefault textButton={"Agregar Producto"} bgButton={"bg-gray-500"} hoverBgButton={"hover:bg-gray-700"} widthButton={"w-40"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="agregarProducto" // Tipo de modal
          />

          {/* Botón 2: Generar Reporte */}
          <ButtonDefault textButton={"Generar Reporte"} bgButton={"bg-gray-500"} hoverBgButton={"hover:bg-gray-700"} widthButton={"w-40"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="generarReporte" // Tipo de modal
          />

          {/* Botón 3: Cerrar Sesión */}
          <ButtonDefault textButton={"Cerrar Sesión"} bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-40"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-white"} 
            modalType="cerrarSesion" // Tipo de modal
            onCerrarSesion={handleCerrarSesion} // Pasa la función como prop
          />
        </div>


        <form className="max-w-96 mx-auto my-3">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar Producto..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
          </div>
        </form>


        <table className="mx-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-2 border-r-1">Producto</th>
              <th className="py-3 px-2 border-r-1">Ud. Medida</th>
              <th className="py-3 px-2 border-r-1">Entrada</th>
              <th className="py-3 px-2 border-r-1">Salida</th>
              <th className="py-3 px-2 border-r-1">Stock</th>
              <th className="py-3 px-2 border-r-1">Caducidad Próxima</th>
              <th className="py-3 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {productos.map((producto) => (
              <tr key={producto.id} className="bg-white border-y-8 border-neutral-300 ">
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.nombre}</td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.unidad}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={"aaa"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"ml-1"} colorButton={"text-white"}
                    modalType="registrarEntrada"
                  />
                </td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={"aaa"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"ml-1"} colorButton={"text-white"}
                    modalType="registrarSalida"
                  />
                </td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{"aaa"}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={"aaa"} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-40"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-white"}
                    modalType="caducidad" // Tipo de modal en el componente
                    modalData={"aaa"} // Pasa los detalles como prop para generar la tabla en el modal.
                  />
                </td>
                <td className="text-center min-w-28">
                  <ButtonDefault textButton={"✏"} bgButton={"bg-blue-500"} hoverBgButton={"hover:bg-blue-800"} widthButton={"w-12"} marginButton={"ml-1"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} colorButton={"text-white"}
                    modalType="editarProducto"
                  />
                  <ButtonDefault textButton={"🗑"} bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-12"} marginButton={"mx-1"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} colorButton={"text-white"}
                    modalType="eliminarProducto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;

