export default function ProductsTable({
  products,
  handleConfirmationModal,
  setShowModal,
  setDeleteId,
}) {
  return (
    <div className="rounded-lg ring-1 m-3 ring-gray-900 ring-opacity-5 overflow-hidden bg-white">
      <header className="px-5 py-4 border-b border-gray-100 flex flex-row justify-between items-center">
        <h2 className="font-semibold text-gray-800">Productos</h2>
        <div
          onClick={() => setShowModal(true)}
          className="flex flex-row items-center cursor-pointer bg-gray-600 rounded-lg mx-2  hover:text-white  ring-gray-700 hover:ring-2 "
        >
          <p className="text-white text-sm mx-2">Adicionar Producto</p>
          <i className="text-white rounded-full  las la-plus  text-sm p-1.5 ml-auto inline-flex items-center "></i>
        </div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto ">
          <table className="table-auto w-full">
            <thead className="text-xs  uppercase text-gray-400 bg-gray-50  rounded-sm">
              <tr>
                <th className="p-2">
                  <div class="font-light text-left">Nombre</div>
                </th>
                <th className="p-2">
                  <div className="font-light text-center">Ventas</div>
                </th>
                <th className="p-2">
                  <div className="font-light text-center">Existencia</div>
                </th>
                <th className="p-2">
                  <div className="font-light text-center ">Vendidos</div>
                </th>
                <th className="p-2">
                  <div className="font-light text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs lg:text-sm font-medium divide-y divide-gray-100 items-center">
              {products ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="p-2 flex items-center">
                      <div className="text-gray-800">{product.name}</div>
                    </td>

                    <td className="text-center">
                      <p className="px-2  inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                        {product.salePrice * product.quantitySold}
                      </p>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{product.quantity}</div>
                    </td>
                    <td className="p-2 text-center text-light-gray-500">
                      {product.quantitySold}
                    </td>
                    <td className="p-2 text-center text-light-gray-500 flex flex-row justify-center">
                      <i className="las la-edit w-12 h-12 text-green-500 text-xl cursor-pointer"></i>
                      <i
                        className="las la-trash w-12 h-12 text-red-500 text-xl cursor-pointer"
                        onClick={() => {
                          setDeleteId(product.id);
                          handleConfirmationModal();
                        }}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="flex flex-row border">
                  <p className="p-2 mx-auto">No hay Productos Disponibles</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
