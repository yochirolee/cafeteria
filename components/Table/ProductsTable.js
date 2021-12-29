export default function ProductsTable({
  products,
  handleDeleteProduct,
  setShowModal,
}) {
  return (
    <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 m-2">
      <header class="px-5 py-4 border-b border-gray-100 flex flex-row justify-between items-center">
        <h2 class="font-semibold text-gray-800">Productos</h2>
        <div className="flex flex-row items-center ">
          <p className='text-gray-700 text-sm'>Adicionar Producto</p>
          <i
            className="bg-gray-700 text-white p-1 px-2 m-2 rounded-lg las la-plus  "
            onClick={() => setShowModal(true)}
          ></i>
        </div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto ">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div class="font-semibold text-left">Nombre</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Ventas</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Existencia</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Vendidos</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 items-center">
              {products ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="p-2 flex items-center">
                      <div className="text-gray-800">{product.name}</div>
                    </td>

                    <td className="p-2 text-center text-green-500">
                      ${product.quantity + product.salePrice}
                    </td>
                    <td className="p-2">
                      <div className="text-center">{product.quantity}</div>
                    </td>
                    <td className="p-2 text-center text-light-blue-500">
                      {product.quantitySold}
                    </td>
                    <td className="p-2 text-center text-light-blue-500 flex flex-row">
                      <i className="las la-edit w-12 h-12 text-green-500 text-xl cursor-pointer"></i>
                      <i
                        className="las la-trash w-12 h-12 text-red-500 text-xl cursor-pointer"
                        onClick={() => handleDeleteProduct(product.id)}
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
