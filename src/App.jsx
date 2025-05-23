import React, { useState, useEffect } from "react";
import ButtonDefault from "./components/ButtonDefault";
import Cookies from "universal-cookie";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ModalAlerta from "./components/modalComponents/modalAlerta";
import ModalManual from "./components/modalComponents/modalManual";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const cookies = new Cookies();

//ESTE ES EL APP------------------------------------------
const TableComponent = () => {
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ProductoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showManual, setShowManual] = useState(false);

  const fetchTodoData = async () => {
    const token = cookies.get("token");
    setDataLoading(true);
  
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
    } finally {
      setDataLoading(false);
    }
  };

  const handleEliminarProducto = async () => {
    if (!ProductoSeleccionado) return;
  
    const token = getCookie("token");
    setLoading(true);
  
    try {
      const response = await fetch(`http://localhost:8080/producto/${ProductoSeleccionado.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setProductos(prev => prev.filter(p => p.id !== ProductoSeleccionado.id));
        setShowConfirmModal(false);
        setProductoSeleccionado(null);
        fetchTodoData();
      } else {
        const data = await response.json();
        alert("Error: " + (data.message || response.status));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };
  

  const exportToExcel = async () => {
    setExportLoading(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte");

    try {
      // Encabezados
      const headers = ["Producto", "Ud. Medida", "Entrada", "Salida", "Stock", "Cad. Próxima"];
      worksheet.addRow(headers);

      // Estilos encabezado
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FF404040" } };
        cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD3D3D3" } };
      });

      // Datos
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

        for (let i = 1; i <= 6; i++) {
          row.getCell(i).alignment = {
            vertical: "middle",
            horizontal: i > 1 ? "center" : "left",
            wrapText: true
          };
        }
      });

      // Ajustar columnas
      worksheet.getColumn(1).width = 35;
      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 10;
      worksheet.getColumn(4).width = 10;
      worksheet.getColumn(5).width = 15;
      worksheet.getColumn(6).width = 13;

      // Guardar
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      saveAs(blob, `Reporte_Productos_${new Date().toLocaleDateString("es-MX")}.xlsx`);
    } catch (error) {
      console.error("Error al generar reporte:", error);
      alert("Ocurrió un error al generar el reporte");
    } finally {
      setExportLoading(false);
    }
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
    fetchTodoData();
  }, []);

  return (
    <>
      <div className="items-center p-4 bg-gradient-to-r from-[#ddd2c5] to-[#FFFF] h-screen">
        <div className="m-auto max-w-xl flex justify-center gap-2">
          <ButtonDefault 
            textButton={dataLoading ? "Cargando..." : "Agregar Producto"} 
            bgButton={dataLoading ? "bg-[#4a4a58]" : "bg-[#181820]"} 
            hoverBgButton={dataLoading ? "" : "hover:bg-[#4a4a58]"} 
            widthButton={"w-40"} 
            paddingButtonX={"px-3"} 
            paddingButtonY={"py-1"} 
            marginButton={"mx-1"} 
            colorButton={"text-white"}
            modalType="agregarProducto"
            onUpdateData={fetchTodoData}
            disabled={dataLoading}
          />

          <button
            onClick={exportToExcel}
            disabled={exportLoading || dataLoading || productos.length === 0}
            className={`bg-[#181820] w-40 text-white px-3 py-1 mx-1 rounded-lg transition ${
              exportLoading || dataLoading || productos.length === 0 
                ? "opacity-80 cursor-not-allowed" 
                : "hover:bg-[#4a4a58]"
            }`}
          >
            {exportLoading ? "Generando..." : "Generar Reporte"}
          </button>

          <ButtonDefault 
            textButton={"Cerrar Sesión"} 
            bgButton={"bg-[#8a1329]"} 
            hoverBgButton={"hover:bg-[#550b19]"} 
            widthButton={"w-40"} 
            paddingButtonX={"px-3"} 
            paddingButtonY={"py-1"} 
            marginButton={"mx-1"} 
            colorButton={"text-white"}
            modalType="cerrarSesion"
            onCerrarSesion={handleCerrarSesion}
            disabled={loading || exportLoading || dataLoading}
          />
        </div>

        <form className="w-full max-w-md mx-auto flex my-3 gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-[#181820]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input 
              type="search"
              id="default-search"
              className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-[#181820] rounded-lg bg-gray-50 focus:ring-white focus:border-white"
              placeholder="Buscar Producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required 
            />
          </div>
          <button  type="button" 
            onClick={() => setShowManual(true)} 
            title="Ver manual de usuario"
            className="w-12 h-11.5 flex items-center justify-center bg-lila rounded-lg bg-[#181820] hover:bg-[#4a4a58] hover:scale-110 transition-transform duration-200"
          >
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
            </svg>
          </button>
        </form>


        <ModalManual isOpen={showManual} onClose={() => setShowManual(false)}/>

        <div className="overflow-y-auto max-h-[calc(100vh-150px)] w-full">
            <table className="mx-auto table-fixed border-separate border-spacing-y-2">
              <thead className="sticky top-0 bg-[#8a1329] text-white">
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

                  return (
                    <tr key={producto.id} className="bg-white shadow-md">
                      <td className="bg-gray-50 px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.nombre}</td>
                      <td className="bg-gray-50 px-4 py-2 text-center border-r-2 border-r-gray-200">{producto.unidad}</td>
                      <td className="bg-gray-50 px-1 text-center border-r-2 border-r-gray-200">
                        <ButtonDefault 
                          textButton={totalEntrada} 
                          bgButton={"bg-[#34070a]"} 
                          hoverBgButton={"hover:bg-[#6d0a1c]"} 
                          widthButton={"min-w-24"} 
                          paddingButtonX={"px-3"} 
                          paddingButtonY={"py-1"} 
                          marginButton={"ml-1"} 
                          colorButton={"text-white"}
                          modalType="registrarEntrada" 
                          modalData={producto}
                          onUpdateData={fetchTodoData}
                          disabled={loading || exportLoading || dataLoading}
                        />
                      </td>
                      <td className="bg-gray-50 px-1 text-center border-r-2 border-r-gray-200">
                        <ButtonDefault 
                          textButton={totalSalida} 
                          bgButton={"bg-[#34070a]"} 
                          hoverBgButton={"hover:bg-[#6d0a1c]"} 
                          widthButton={"min-w-24"} 
                          paddingButtonX={"px-3"} 
                          paddingButtonY={"py-1"} 
                          marginButton={"ml-1"} 
                          colorButton={"text-white"}
                          modalType="registrarSalida" 
                          modalData={producto}
                          onUpdateData={fetchTodoData}
                          disabled={loading || exportLoading || dataLoading}
                        />
                      </td>
                      <td className={`px-4 py-2 text-center border-r-2 border-r-gray-200 ${
                        parseInt(producto.stock) > parseInt(producto.avisoStock || 0)
                          ? 'bg-gray-50'
                          : 'bg-[#8a1329] text-white'
                      }`}>
                        {producto.stock}
                      </td>
                      <td className="bg-gray-50 px-1 text-center border-r-2 border-r-gray-200">{caducidadProxima}</td>
                      <td className="bg-gray-50 text-center min-w-28">
                        <ButtonDefault 
                          textButton={"✏"} 
                          bgButton={"bg-[#9a526a]"} 
                          hoverBgButton={"hover:bg-[#550b19]"} 
                          widthButton={"w-12"} 
                          marginButton={"ml-1"} 
                          paddingButtonX={"px-3"} 
                          paddingButtonY={"py-1"} 
                          colorButton={"text-white"}
                          modalType="editarProducto"
                          modalData={producto}
                          onUpdateData={fetchTodoData}
                          disabled={loading || exportLoading || dataLoading}
                        />
                        <button
                          onClick={() => {
                            setProductoSeleccionado(producto);
                            setShowConfirmModal(true);
                          }}
                          disabled={loading || exportLoading || dataLoading}
                          className={`px-3 py-1 mx-1 w-12 rounded bg-[#8a1329] text-white ${
                            loading || exportLoading || dataLoading 
                              ? "opacity-50 cursor-not-allowed" 
                              : "hover:bg-[#550b19]"
                          }`}
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

      {(exportLoading || dataLoading) && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-30 z-30">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-700">
              {dataLoading && "Actualizando productos..."}
              {exportLoading && "Generando reporte..."}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TableComponent;