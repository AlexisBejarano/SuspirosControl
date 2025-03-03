import React, { useState } from "react";

const TableComponent = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Harina",
      unidad: "1 kg",
      detalles: [
        {
          id: 1,
          lote: "Lote001",
          cantidad: 20,
          caducidad: "2025-06-15",
          movimientos: [
            {
              id: 1,
              entrada: 20,
              salida: 5,
            },
          ],
        },
        {
          id: 2,
          lote: "Lote002",
          cantidad: 15,
          caducidad: "2025-07-20",
          movimientos: [
            {
              id: 2,
              entrada: 15,
              salida: 3,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nombre: "Azúcar",
      unidad: "1 kg",
      detalles: [
        {
          id: 2,
          lote: "Lote006",
          cantidad: 30,
          caducidad: "2025-08-10",
          movimientos: [
            {
              id: 2,
              entrada: 30,
              salida: 10,
            },
          ],
        },
        {
          id: 3,
          lote: "Lote007",
          cantidad: 25,
          caducidad: "2025-09-15",
          movimientos: [
            {
              id: 3,
              entrada: 25,
              salida: 8,
            },
          ],
        },
        {
          id: 4,
          lote: "Lote007",
          cantidad: 25,
          caducidad: "2025-09-15",
          movimientos: [
            {
              id: 3,
              entrada: 25,
              salida: 8,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      nombre: "LECHE",
      unidad: "1 kg",
      detalles: [
        {
          id: 3,
          lote: "Lote006",
          cantidad: 30,
          caducidad: "2025-08-10",
          movimientos: [
            {
              id: 3,
              entrada: 30,
              salida: 10,
            },
          ],
        },
      ],
    },
  ]);


  // Handlers para las acciones
  const handleEditar = (id) => {
    alert(`Editar producto con ID: ${id}`);
  };

  const handleEntrada = (id) => {
    alert(`Entrada producto con ID: ${id}`);
  };

  const handleSalida = (id) => {
    alert(`Salida producto con ID: ${id}`);
  };

  const handleEliminar = (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (confirmDelete) {
      setProductos(productos.filter((item) => item.id !== id));
    }
  };

  return (



    <table class="table-auto">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="py-3">Producto</th>
          <th className="py-3">Ud. Medida</th>
          <th className="py-3">Entrada</th>
          <th className="py-3">Salida</th>
          <th className="py-3">Stock</th>
          <th className="py-3">Caducidad Próxima</th>
          <th className="py-3">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>111</td>
          <td>111</td>
          <td>111</td>
        </tr>
        <tr>
          <td>222</td>
          <td>222</td>
          <td>222</td>
          </tr>
        <tr>
          <td>333</td>
          <td>333</td>
          <td>333</td>
        </tr>
        </tbody>
    </table>
    
  );
};

export default TableComponent;

