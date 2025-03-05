import React, { useState } from "react";
import ButtonEntradasSalidas from "./components/ButtonEntradasSalidas"
import ButtonCaducidad from "./components/ButtonCaducidad"
import ButtonAction from "./components/ButtonAction";

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

                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.nombre}</td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.unidad_medida}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonEntradasSalidas buttonEntradasSalidas={producto.movimientos[0].entrada}/>
                </td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                  <ButtonEntradasSalidas buttonEntradasSalidas={producto.movimientos[0].salida} />
                </td>
                <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.stock}</td>
                <td className="px-1 text-center border-r-2 border-r-gray-200">
                <ButtonCaducidad detalles={producto.detalle_productos} />
                </td>
                <td className="text-center min-w-28">
                  <ButtonAction buttonAction={() => handleEditar(producto.id)} buttonIco={"✏"} color={"bg-blue-500"} colorHover={"hover:bg-blue-800"} />
                  <ButtonAction buttonAction={() => handleEliminar(producto.id)} buttonIco={"🗑"} color={"bg-red-700"} colorHover={"hover:bg-red-900"} />
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

