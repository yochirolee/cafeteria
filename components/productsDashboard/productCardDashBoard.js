export default function ProductCardDashBoard({
  product,
  handleGetProductQuantityAdd,
  setDeleteId,
  handleConfirmationModalDelete,
  handleGetProductForUpdate,
  handleGetProductForSellAll,
  

}) {
  return (
    <div className="flex flex-col bg-white rounded-lg mx-2 text-center my-2 ">
      <div className="flex flex-row items-center  ">
        <div className="basis-2/4 ">
          <h2 className="text-sm font-bold  text-gray-500  lg:text-2xl">
            {product.name}
          </h2>
          <div className="items-center text-md inline-flex text-sm rounded-lg  lg:bg-gray-600  lg:shadow-lg px-2 lg:font-bold lg:text-white">
            <span className="text-xs pr-2 ">Precio de Venta: </span>
            <span>$ {product.price}</span>
          </div>
        </div>
        <div className="basis-5/6  ">
          <div className="flex flex-col my-1  ">
            <div
              className={`
          flex flex-row  mt-1 pb-2   mx-auto lg:border-none `}
            >
              <p className="mr-2 my-auto ">Inventario</p>
              <p
                className={`${
                  product.quantity == 0
                    ? "bg-red-600 animate-pulse"
                    : product.quantity < 10
                    ? " bg-yellow-500"
                    : "bg-green-600 "
                } flex flex-row px-2 h-6 my-auto  text-white rounded-full   mx-auto items-center lg:border-none `}
              >
                {product.quantity}
              </p>
            </div>
            <div className="flex mx-auto border rounded-lg bg-gray-100/80 p-1  text-xs ">
              <div className="flex  items-center mx-2 ">
                <p className="mr-1">Vendidos</p>
                <p> {product.quantity_sold}</p>
              </div>
              <div className="flex  items-center mx-2 ">
                <p className="mr-1">Venta</p>
                <p> $ {product.price * product.quantity_sold}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex border-t bg-gray-100/80  w-full pb-2 ">
        <div className="mx-auto">
          <div className="place-items-end text-xl">
            <button className="p-2  rounded-lg text-xs border border-yellow-600/30  mt-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-600 hover:text-white">
              Vender al Costo
            </button>

            <button
              onClick={() => handleGetProductForSellAll(product)}
              className="p-2 mx-2 rounded-lg text-xs border border-green-600/30  mt-2 text-green-600 bg-green-50 hover:bg-green-600 hover:text-white"
            >
              Vender Todo
            </button>
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
                handleConfirmationModalDelete();
              }}
              className="las la-trash-alt  h-6 w-6  text-sm rounded-full text-center pt-0.5   border border-red-300  text-red-600 bg-red-100"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
