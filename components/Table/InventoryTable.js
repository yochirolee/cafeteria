export default function InventoryTable({products,handleDeleteProduct,setShowModal}) {
  return (
    <div className=" m-2 bg-white w-auto flex flex-col  ">
      <div className="flex flex-row justify-between  items-center border-b">
        <p className="ml-2">Inventario:</p>
        <i
          className="bg-gray-700 text-white p-1 px-2 m-2 rounded-lg las la-plus  "
          onClick={() => setShowModal(true)}
        ></i>
      </div>   {products ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                  {product.name}
                </td>
                <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                  {product.quantity}
                </td>
                <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                  {product.quantitySold}
                </td>
                <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                  <div className="flex flex-row justify-around align-middle text-center">
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
      <table className="border-collapse table-auto  text-sm ">
        <thead className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
          <tr>
            <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
              Producto
            </th>

            <th className="border-b text-center dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 ">
              Existencia
            </th>
            <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
              Vendido
            </th>
            <th className="border-b dark:border-gray-600 font-medium  text-gray-400 dark:text-gray-200 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
       
        </tbody>
      </table>
    </div>
  );
}
