import React, { useState } from "react";
import ButtonDefault from "./components/ButtonDefault"

const TableComponent = () => {


  const [productos, setProductos] = useState([
  {
    "productos": [
      {
        "id": 1,
        "nombre": "Producto A",
        "unidad_medida": "kg",
        "stock": 130,
        "movimientos": [
          {
            "id": 1,
            "entrada": 20,
            "salida": 30
          }
        ],
        "detalle_productos": [
          {
            "id": 1,
            "lote": "L001",
            "cantidad": 10,
            "caducidad": "2023-12-10T00:00:00Z"
          },
          {
            "id": 2,
            "lote": "L002",
            "cantidad": 70,
            "caducidad": "2024-01-31T00:00:00Z"
          },
          {
            "id": 3,
            "lote": "L003",
            "cantidad": 40,
            "caducidad": "2024-01-20T00:00:00Z"
          }
        ]
      },
      {
        "id": 2,
        "nombre": "Producto B",
        "unidad_medida": "litros",
        "stock": 140,
        "movimientos": [
          {
            "id": 3,
            "entrada": 150,
            "salida": 30
          }
        ],
        "detalle_productos": [
          {
            "id": 3,
            "lote": "L003",
            "cantidad": 120,
            "caducidad": "2023-11-15T00:00:00Z"
          },
          {
            "id": 4,
            "lote": "L004",
            "cantidad": 20,
            "caducidad": "2024-02-28T00:00:00Z"
          }
        ]
      },
      {
        "id": 3,
        "nombre": "Producto C",
        "unidad_medida": "unidades",
        "stock": 65,
        "movimientos": [
          {
            "id": 5,
            "entrada": 50,
            "salida": 5
          }
        ],
        "detalle_productos": [
          {
            "id": 5,
            "lote": "L005",
            "cantidad": 45,
            "caducidad": "2023-10-10T00:00:00Z"
          },
          {
            "id": 6,
            "lote": "L006",
            "cantidad": 20,
            "caducidad": "2024-03-15T00:00:00Z"
          }
        ]
      }
    ],
    "usuarios": [
      {
        "id": 1,
        "username": "user1",
        "password": "password1"
    }]
  }
  ]);


    // Función para obtener la fecha de caducidad más próxima
    const obtenerCaducidadProxima = (detalles) => {
    const fechas = detalles.map((lote) => new Date(lote.caducidad));
    return fechas.length ? new Date(Math.min(...fechas)).toISOString().split("T")[0] : "N/A";
  };
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


  return (
    <>
      <div className="items-center bg-neutral-300 p-4">
        <div className="m-auto max-w-xl flex justify-center gap-2">
        {/* Botón 1: Agregar Producto */}
        <ButtonDefault textButton={"Agregar Producto"} bgButton={"bg-gray-500"} hoverBgButton={"hover:bg-gray-700"} widthButton={"w-40"} marginButton={"mx-1"} colorButton={"text-white"}
          modalType="agregarProducto" // Tipo de modal
        />

        {/* Botón 2: Generar Reporte */}
        <ButtonDefault textButton={"Generar Reporte"} bgButton={"bg-gray-500"} hoverBgButton={"hover:bg-gray-700"} widthButton={"w-40"} marginButton={"mx-1"} colorButton={"text-white"}
          modalType="generarReporte" // Tipo de modal
        />

        {/* Botón 3: Cerrar Sesión */}
        <ButtonDefault textButton={"Cerrar Sesión"} bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-40"} marginButton={"mx-1"} colorButton={"text-white"}
          modalType="cerrarSesion" // Tipo de modal
        />
      </div>


      <form className="max-w-96 mx-auto my-3">   
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
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
            {productos[0].productos.map((producto) => (
              <tr key={producto.id} className="bg-white border-y-8 border-neutral-300 ">

                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.nombre}</td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.unidad_medida}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={producto.movimientos[0].entrada} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"}marginButton={"ml-1"} colorButton={"text-white"}/>
                </td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={producto.movimientos[0].salida} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"}marginButton={"ml-1"} colorButton={"text-white"}/>
                </td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.stock}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonDefault textButton={obtenerCaducidadProxima(producto.detalle_productos)} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-green-700"} widthButton={"w-40"} marginButton={"mx-1"} colorButton={"text-white"}
                      modalType="caducidad" // Tipo de modal en el componente
                      modalData={producto.detalle_productos} // Pasa los detalles como prop para generar la tabla en el modal.
                    />
                </td>
                <td className="text-center min-w-28">
                  <ButtonDefault textButton={"✏"}  bgButton={"bg-blue-500"} hoverBgButton={"hover:bg-blue-800"} widthButton={"w-12"} marginButton={"ml-1"} colorButton={"text-white"}/>
                  <ButtonDefault textButton={"🗑"}  bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-12"} marginButton={"mx-1"} colorButton={"text-white"}/>
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

