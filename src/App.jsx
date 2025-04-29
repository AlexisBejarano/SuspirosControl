import React, { useState, useEffect } from "react";
import ButtonDefault from "./components/ButtonDefault";
import Cookies from "universal-cookie";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ModalAlerta from "./components/modalComponents/modalAlerta";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const cookies = new Cookies();

//ESTE ES EL APP------------------------------------------
const TableComponent = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ProductoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodoData = async () => {
    const token = cookies.get("token");
  
    if (!token) {
      handleCerrarSesion();
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
      setProductos(data.data);
  
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
      handleCerrarSesion();
    }
  };
  

  const handleEliminarProducto = async () => {
    if (!ProductoSeleccionado) return;

    setLoading(true);
    const token = getCookie("token");

    try {
      const response = await fetch(`http://localhost:8080/producto/${ProductoSeleccionado.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Eliminamos el producto de la lista local
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== ProductoSeleccionado.id));
        setShowConfirmModal(false);
        setProductoSeleccionado(null);
        console.log("Producto eliminado:", data);
        // Hacemos nueva petición para actualizar datos
        fetchTodoData();
      } else {
        alert("Error al eliminar: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Ocurrió un error al intentar eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };

  //GENERADOR DE REPORTE EXCEL
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte");

    // Encabezados
    const headers = [
      "Producto",
      "Ud. Medida",
      "Entrada",
      "Salida",
      "Stock",
      "Cad. Próxima"
    ];

    // Añadir encabezado
    worksheet.addRow(headers);

    // Aplicar estilos al encabezado
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FF404040" } }; // Negrita y gris oscuro
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true }; // Ajuste de texto
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD3D3D3" }, // Fondo gris claro
      };
    });

    // Agregar datos
    productos.forEach((producto) => {
      const entrada = producto.movimiento ? parseInt(producto.movimiento.entrada) : 0;
      const salida = producto.movimiento ? parseInt(producto.movimiento.salida) : 0;

      const caducidadMasProxima = producto.detalle_productos
        ?.map((d) => new Date(d.caducidad))
        .sort((a, b) => a - b)[0];

      const caducidadProxima = caducidadMasProxima
        ? caducidadMasProxima.toLocaleDateString("es-MX", {
          year: "numeric", month: "2-digit", day: "2-digit",
        })
        : "Sin fecha";

      const row = worksheet.addRow([
        producto.nombre,
        producto.unidad,
        entrada,
        salida,
        producto.stock,
        caducidadProxima,
      ]);

      // Centrar celdas de columnas 2 a 6 y ajustar texto en todas
      for (let i = 1; i <= 6; i++) {
        row.getCell(i).alignment = {
          vertical: "middle",
          horizontal: i > 1 ? "center" : "left", // primer campo (nombre) justificado a la izquierda
          wrapText: true
        };
      }
    });

    // Ajustar manualmente el ancho de algunas columnas
    worksheet.getColumn(1).width = 35;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 10;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 13;

    // Guardar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    saveAs(blob, `Reporte_Productos_${new Date().toLocaleDateString("es-MX")}.xlsx`);
  };

  const filteredProductos = productos.filter((producto) => {
    const entrada = producto.movimiento ? parseInt(producto.movimiento.entrada) : 0;
    const salida = producto.movimiento ? parseInt(producto.movimiento.salida) : 0;

    const caducidadMasProxima = producto.detalle_productos
      ?.map((d) => new Date(d.caducidad))
      .sort((a, b) => a - b)[0];

    const caducidadProxima = caducidadMasProxima
      ? caducidadMasProxima.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : "Sin fecha";

    const search = searchTerm.toLowerCase();

    return (
      producto.nombre.toLowerCase().includes(search) ||
      producto.unidad.toLowerCase().includes(search) ||
      entrada.toString().includes(search) ||
      salida.toString().includes(search) ||
      producto.stock.toString().includes(search) ||
      caducidadProxima.toLowerCase().includes(search)
    );
  });

  const handleCerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("token", { path: "/" });
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = cookies.get("token");

      if (!token) {
        handleCerrarSesion();
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
        setProductos(data.data);

      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
        handleCerrarSesion();
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
            onUpdateData={fetchTodoData}
          />

          {/* Botón 2: Generar Reporte */}
          <button
            onClick={exportToExcel}
            className="bg-gray-500 hover:bg-gray-700 w-40 text-white px-3 py-1 mx-1 rounded-lg transition"
          >
            Generar Reporte
          </button>

          {/* Botón 3: Cerrar Sesión */}
          <ButtonDefault textButton={"Cerrar Sesión"} bgButton={"bg-red-700"} hoverBgButton={"hover:bg-red-900"} widthButton={"w-40"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"mx-1"} colorButton={"text-white"}
            modalType="cerrarSesion" // Tipo de modal
            onCerrarSesion={handleCerrarSesion}
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
            <input type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar Producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
          </div>
        </form>

        <div className="overflow-y-auto max-h-[calc(100vh-150px)] w-full">
          <table className="mx-auto table-fixed border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-2 border-r-1">Producto</th>
                <th className="py-3 px-2 border-r-1">Ud. Medida</th>
                <th className="py-3 px-2 border-r-1">Entrada</th>
                <th className="py-3 px-2 border-r-1">Salida</th>
                <th className="py-3 px-2 border-r-1">Stock</th>
                <th className="py-3 px-2 border-r-1">Cad. Próxima</th>
                <th className="py-3 px-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => {

                const totalEntrada = producto.movimiento ? parseInt(producto.movimiento.entrada) : 0;
                const totalSalida = producto.movimiento ? parseInt(producto.movimiento.salida) : 0;

                // Obtener caducidad más próxima
                const caducidadMasProxima = producto.detalle_productos
                  ?.map((d) => new Date(d.caducidad))
                  .sort((a, b) => a - b)[0]; // ordena y toma la más cercana

                const caducidadProxima = caducidadMasProxima
                  ? caducidadMasProxima.toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  : "Sin fecha";

                return (
                  <tr key={producto.id} className="bg-white shadow-md">
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.nombre}</td>
                    <td className="px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.unidad}</td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">
                      <ButtonDefault textButton={totalEntrada} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"ml-1"} colorButton={"text-white"}
                        modalType="registrarEntrada" modalData={producto}
                        onUpdateData={fetchTodoData}
                      />
                    </td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">
                      <ButtonDefault textButton={totalSalida} bgButton={"bg-green-500"} hoverBgButton={"hover:bg-emerald-700"} widthButton={"min-w-24"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} marginButton={"ml-1"} colorButton={"text-white"}
                        modalType="registrarSalida" modalData={producto}
                        onUpdateData={fetchTodoData}
                      />
                    </td>
                    <td
                      className={`px-4 py-2 text-center border-r-2 border-r-gray-200 ${
                        parseInt(producto.stock) > parseInt(producto.avisoStock || 0)
                          ? 'bg-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {producto.stock}
                    </td>
                    <td className="px-1 text-center border-r-2 border-r-gray-200">{caducidadProxima}</td>
                    <td className="text-center min-w-28">
                      <ButtonDefault textButton={"✏"} bgButton={"bg-blue-500"} hoverBgButton={"hover:bg-blue-800"} widthButton={"w-12"} marginButton={"ml-1"} paddingButtonX={"px-3"} paddingButtonY={"py-1"} colorButton={"text-white"}
                        modalType="editarProducto"
                        modalData={producto}
                        onUpdateData={fetchTodoData}
                      />
                      <button
                        onClick={() => {
                          setProductoSeleccionado(producto);
                          setShowConfirmModal(true);
                        }}
                        className="px-3 py-1 mx-1 w-12 rounded bg-red-700 hover:bg-red-900 text-white"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-gray-300/50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ModalAlerta
              onAceptar={handleEliminarProducto}
              onCancelar={() => {
                setShowConfirmModal(false);
                setProductoSeleccionado(null);
              }}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableComponent;

