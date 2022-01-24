export default function ProductCardDashBoard({
  product,
  handleGetProductQuantityAdd,
  setDeleteId,
  handleConfirmationModal,
  handleGetProductForUpdate,
}) {
  return (
    <div>
      <div class="flex flex-row items-center text-center my-2  bg-white rounded-lg mx-2">
        <div class="basis-2/4 ">
          <h2 className="text-sm font-bold  text-gray-500  lg:text-2xl">
            {product.name}
          </h2>
          <div className="items-center text-md inline-flex text-sm rounded-lg  lg:bg-gray-600  lg:shadow-lg px-2 lg:font-bold lg:text-white">
            <span className="text-xs pr-2 ">Precio: </span>
            <span>$ {product.price}</span>
          </div>
        </div>
        <div class="basis-5/6  ">
          <div className="flex flex-col my-1  ">
            <div
              className={`
          flex flex-row  mt-1 pb-2  mx-auto lg:border-none `}
            >
              <p className="mr-2 ">Inventario</p>
              <p
                className={`${
                  product.quantity == 0
                    ? "bg-red-600 animate-pulse"
                    : product.quantity < 10
                    ? " bg-yellow-500"
                    : "bg-green-600 "
                } flex flex-row px-2  text-white rounded-full   mx-auto items-center lg:border-none `}
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
        </div>
        <div class="basis-2/4">
          <div className="place-items-end text-xl">
            <i
              onClick={() => handleGetProductQuantityAdd(product)}
              className="las la-plus  h-6 w-6  text-sm rounded-full text-center pt-0.5 mr-2 border border-gray-300    text-gray-600 bg-gray-100 "
            ></i>
            <i
              onClick={() => handleGetProductForUpdate(product)}
              className="las la-edit h-6 w-6  text-sm rounded-full text-center pt-0.5 mr-2   border border-green-300    text-green-600 bg-green-100"
            ></i>
            <i
              onClick={() => {
                setDeleteId(product.id);
                handleConfirmationModal();
              }}
              className="las la-trash-alt  h-6 w-6  text-sm rounded-full text-center pt-0.5   border border-red-300  text-red-600 bg-red-100"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
