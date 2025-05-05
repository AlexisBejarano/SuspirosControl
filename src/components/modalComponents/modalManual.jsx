export default function ModalManual({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-white/30 border-b border-white/20 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Manual de Usuario - Control de Inventario
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto flex-grow bg-white/40 p-6">
          <div className="space-y-8 text-gray-700">
            {/* Explicacion de botones principales */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Funcionalidades Principales
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* btn Agregar Producto */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-lila/20 rounded-full">
                      1
                    </span>
                    Boton Agregar Producto
                  </h4>
                  <p className="text-sm">
                    Obligatoriamente acomplete los campos
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Nombre producto</li>
                    <li>Unidad medida (kg, litros, unidades)</li>
                    <li>Stock</li>
                    <li>
                      <img src="/img/btnAgregarr.png" alt="Ayuda" />
                    </li>
                  </ul>
                </div>

                {/* btn Generar Reporte */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-lila/20 rounded-full">
                      2
                    </span>
                    Boton Generar Reporte PDF
                  </h4>

                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Listado completo de productos</li>
                    <li>Ud. Medida</li>
                    <li>Entrada de producto</li>
                    <li>Sálida de producto</li>
                    <li>Stock</li>
                    <li>cad. Próxima</li>
                  </ul>
                </div>

                {/* input Barra de Buscar */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-lila/20 rounded-full">
                      3
                    </span>
                    Barra de Búsqueda
                  </h4>
                  <p className="text-sm">Busca productos por:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Nombre</li>
                    <li>Código</li>
                  </ul>
                </div>

                {/* btn Entrada/Salida */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-lila/20 rounded-full">
                      4
                    </span>
                    Botón Entrada/Salida de productos
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Entrada:</p>
                      <ul className="list-disc pl-5">
                        <li>Lote</li>
                        <li>Cantidad</li>
                        <li>Caducidad</li>
                        <li>
                          <img src="/img/entrada.png" alt="Ayuda" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Salida:</p>
                      <ul className="list-disc pl-5">
                        <li>Código producto</li>
                        <li>Cantidad</li>
                        <li>Acciones "editar eliminar"</li>
                        <li>
                          Editar "editar codigo del lote, editar salida de
                          productos "cantidad" y fecha de caducidad del
                          producto".
                        </li>
                        <li>
                          <img src="/img/salida.png" alt="Ayuda" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Gestión de Productos "Tabla general"
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* btn Editar Producto */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2">
                    ✏️ Editar Producto "Acciones"
                  </h4>
                  <p className="text-sm">Edita productos en la tabla</p>
                  <p className="text-sm">
                    "Si acepta muestra una ventana emergente para confirmar o
                    cancelar"
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Modificar nombre Producto</li>
                    <li>Unidad Medida</li>
                    <li>Stock</li>
                    <img src="/img/TablaEditar.png" alt="Ayuda" />
                  </ul>
                </div>

                {/* btn Eliminar Producto */}
                <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lila mb-2">
                    🗑️ Eliminar Producto "Acciones"
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Muestra una ventana emergente para confirmar</li>
                    <li>
                      <img src="/img/AccionTablaEliminar.png" alt="Ayuda" />
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Contactos
              </h3>
              <div className="bg-white/70 p-4 rounded-lg border border-gray-200">
                <p className="text-sm mb-2">
                  Si encuentra un error en la aplicación o tiene alguna duda, no
                  dude en comunicarse con nosotros.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>yolanda.martinez244378@potros.itson.edu.mx</li>
                  <li>luis.dominguez244206@potros.itson.edu.mx</li>
                  <li>omar.castelan244309@potros.itson.edu.mx</li>
                  <li>sergio.gracia244608@potros.itson.edu.mx</li>
                  <p className="text-sm mb-2">Contactos telefonicos</p>
                  <li>622 142 0476</li>
                  <li>622 172 14296</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* elegancia la de francia */}
        <div className="p-4 bg-white/30 border-t border-white/20 sticky bottom-0 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            v1.0 - Sistema de Inventario
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-lila/90 text-white rounded-lg hover:bg-lila transition-all"
          >
            Cerrar Manual
          </button>
        </div>
      </div>
    </div>
  );
}
