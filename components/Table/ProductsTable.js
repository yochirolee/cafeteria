export default function ProductsTable({
  products,
  handleDeleteProduct,
  setShowModal,
}) {
  return (
    <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 m-2">
      <header class="px-5 py-4 border-b border-gray-100 flex flex-row justify-between">
        <h2 class="font-semibold text-gray-800">Productos</h2>
        <div className="flex flex-row text-center items-center">
          <p>Adicionar Producto</p>
          <i
            className="bg-gray-700 text-white p-1 px-2 m-2 rounded-lg las la-plus  "
            onClick={() => setShowModal(true)}
          ></i>
        </div>
      </header>
      <div class="p-3">
        <div class="overflow-x-auto ">
          <table class="table-auto w-full">
            <thead class="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th class="p-2">
                  <div class="font-semibold text-left">Nombre</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-center">Ventas</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-center">Existencia</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-center">Vendidos</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody class="text-sm font-medium divide-y divide-gray-100">
              {products ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td class="p-2">
                      <div class="flex items-center">
                        <div class="text-gray-800">{product.name}</div>
                      </div>
                    </td>

                    <td class="p-2">
                      <div class="text-center text-green-500">
                        ${product.quantity + product.salePrice}
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="text-center">{product.quantity}</div>
                    </td>
                    <td class="p-2">
                      <div class="text-center text-light-blue-500">
                        {product.quantitySold}
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="text-center text-light-blue-500">
                        <i className="las la-edit w-12 h-12 text-green-500 text-xl cursor-pointer"></i>
                        <i
                          className="las la-trash w-12 h-12 text-red-500 text-xl cursor-pointer"
                          onClick={() => handleDeleteProduct(product.id)}
                        ></i>
                      </div>
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
