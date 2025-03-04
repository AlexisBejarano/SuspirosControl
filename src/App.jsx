import React, { useState } from "react";
import ButtonTable from "./components/buttonTable"

const TableComponent = () => {


  const [productos, setProductos] = useState([
    {
      "productos": [
        //PRODUCTO 1.--------------------------
        {
          "id": 1,
          "nombre": "Producto Aaasdad ad asasdasdasasdasd",
          "unidad_medida": "kg",
          "stock": 130, //ES LA SUMA CANTIDADES DE TODOS LOS LOTES.
          "detalle_productos": [
            //LOTE 1.--------------------------
            {
              "id": 1,
              "lote": "L001",
              "cantidad": 20, //ES LA SUMA Y RESTA DE MOVIMIENTOS
              "caducidad": "2023-12-10T00:00:00Z",
              "movimientos": [
                {
                  "id": 1,
                  "entrada": 50,
                  "salida": 30
                }
              ]
            },
            //LOTE 2.--------------------------
            {
              "id": 2,
              "lote": "L002",
              "cantidad": 70, //ES LA SUMA Y RESTA DE MOVIMIENTOS
              "caducidad": "2024-01-31T00:00:00Z",
              "movimientos": [
                {
                  "id": 2,
                  "entrada": 100,
                  "salida": 30
                }
              ]
            },
            //LOTE 3.--------------------------
            {
              "id": 3,
              "lote": "L003",
              "cantidad": 40, //ES LA SUMA Y RESTA DE MOVIMIENTOS
              "caducidad": "2024-01-20T00:00:00Z",
              "movimientos": [
                {
                  "id": 2,
                  "entrada": 50,
                  "salida": 10
                }
              ]
            }
          ]
        },
        //PRODUCTO 2
        {
          "id": 2,
          "nombre": "Producto B",
          "unidad_medida": "litros",
          "stock": 130,
          "detalle_productos": [
            {
              "id": 3,
              "lote": "L003",
              "cantidad": 120,
              "caducidad": "2023-11-15T00:00:00Z",
              "movimientos": [
                {
                  "id": 3,
                  "entrada": 150,
                  "salida": 30
                }
              ]
            },
            {
              "id": 4,
              "lote": "L004",
              "cantidad": 10,
              "caducidad": "2024-02-28T00:00:00Z",
              "movimientos": [
                {
                  "id": 4,
                  "entrada": 50,
                  "salida": 40
                }
              ]
            }
          ]
        },
        //PRODUCTO 3
        {
          "id": 3,
          "nombre": "Producto C",
          "unidad_medida": "unidades",
          "stock": 65,
          "detalle_productos": [
            {
              "id": 5,
              "lote": "L005",
              "cantidad": 45,
              "caducidad": "2023-10-10T00:00:00Z",
              "movimientos": [
                {
                  "id": 5,
                  "entrada": 50,
                  "salida": 5
                }
              ]
            },
            {
              "id": 6,
              "lote": "L006",
              "cantidad": 20,
              "caducidad": "2024-03-15T00:00:00Z",
              "movimientos": [
                {
                  "id": 6,
                  "entrada": 25,
                  "salida": 5
                }
              ]
            }
          ]
        }
      ],
      "usuarios": [
        //USIARIO 1
        {
          "id": 1,
          "username": "user1",
          "password": "password1"
        }
      ]
    }
  ]);


  // Calcular la suma de entradas de un producto
  const calcularSumaEntradas = (producto) =>
    producto.detalle_productos.reduce((total, lote) =>
      total + lote.movimientos.reduce((sum, mov) => sum + mov.entrada, 0), 0);

  // Calcular la suma de salidas de un producto
  const calcularSumaSalidas = (producto) =>
    producto.detalle_productos.reduce((total, lote) =>
      total + lote.movimientos.reduce((sum, mov) => sum + mov.salida, 0), 0);

  // Función para obtener la fecha de caducidad más próxima
  const obtenerCaducidadProxima = (producto) => {
    const fechas = producto.detalle_productos.map((lote) => new Date(lote.caducidad));
    return fechas.length ? new Date(Math.min(...fechas)).toISOString().split("T")[0] : "N/A";
  };

  return (
    <>

    <marquee behavior="scroll" direction="left">SUSPIROS</marquee>
    <div className="flex items-center bg-neutral-300 p-4">
      


      <table className="mx-auto ">
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
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-300">{producto.nombre}</td>
              <td className="px-4 py-2 text-center border-r-2 border-r-gray-300">{producto.unidad_medida}</td>
              
              <td className="px-1 text-center border-r-2 border-r-gray-300">
                <button className="bg-green-500 min-w-24 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                  {calcularSumaEntradas(producto)}
                </button>
              </td>

              <td className="px-1 text-center border-r-2 border-r-gray-300">
                <button className="bg-green-500 min-w-24 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                  {calcularSumaSalidas(producto)}
                </button>
              </td>

              <td className="px-4 py-2 text-center border-r-2 border-r-gray-300">{producto.stock}</td>
              <td className="px-1 text-center border-r-2 border-r-gray-300">
                <button className="bg-green-500 w-full text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition">
                  {obtenerCaducidadProxima(producto)}
                </button>
              </td>
              <td className="text-center min-w-28">
                <button onClick={() => handleEditar(producto.id)} className="bg-blue-500 w-12 text-white py-1 mx-1 rounded-lg hover:bg-blue-800 transition">✏</button>
                <button onClick={() => handleEliminar(producto.id)} className="bg-red-700 w-12 text-white py-1 mr-1 rounded-lg hover:bg-red-900 transition">🗑</button>
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

