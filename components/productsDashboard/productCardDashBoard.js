export default function ProductCardDashBoard({
  product,
  handleGetProductQuantityAdd,
  setDeleteId,
  handleConfirmationModal,
}) {
  return (
    <div
      className={` grid grid-flow-row bg-white grid-cols-3 lg:flex lg:flex-col  items-center m-2 rounded-xl lg:w-5/6 `}
    >
      <div className="flex flex-col mr-2   items-center ">
        <h2 className="text-sm font-bold  pt-2 text-center text-gray-500  lg:text-2xl mb-2">
          {product.name}
        </h2>
        <div className="items-center text-md inline-flex text-sm rounded-lg lg:border lg:bg-gray-600  lg:shadow-lg px-2 lg:font-bold lg:text-white">
          <span className="text-xs pr-2 inline-flex">Precio: </span>
          <span>$ {product.price}</span>
        </div>
      </div>
      <div className="flex flex-col  my-2 rounded-b-lg  ">
        <div
          className={`
          flex flex-row   border-b border-dashed mt-1 pb-2  mx-auto items-center lg:border-none `}
        >
          <p className="mr-2 ">Inventario</p>
          <p
            className={`${
              product.quantity == 0
                ? "bg-red-600 animate-pulse"
                : product.quantity < 10
                ? " bg-yellow-500"
                : "bg-green-600 "
            } flex flex-row px-2  text-white rounded-lg   mx-auto items-center lg:border-none `}
          >
            {product.quantity}
          </p>
        </div>
        <div className="flex flex-row justify-around p-1  text-xs ">
          <div className="flex flex-col items-center mx-2 ">
            <p>Vendidos</p>
            <p>{product.quantity_sold}</p>
          </div>
          <div className="flex flex-col items-center mx-2 ">
            <p>Venta</p>
            <p>${product.price * product.quantity_sold}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto place-items-end text-xl ">
        <i
          onClick={() => handleGetProductQuantityAdd(product)}
          className="las la-plus rounded-full mr-2 border border-gray-300  p-1   text-gray-600 bg-gray-100 "
        ></i>
        <i className="las la-edit rounded-full mr-2 border border-green-300  p-1  text-green-600 bg-green-100"></i>
        <i
          onClick={() => {
            setDeleteId(product.id);
            handleConfirmationModal();
          }}
          className="las la-trash-alt rounded-full  border border-red-300 p-1  text-red-600 bg-red-100"
        ></i>
      </div>
    </div>
  );
}
