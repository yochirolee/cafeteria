export default function ProductCardDashBoard({
  product,
  handleGetProductQuantityAdd,
  setDeleteId,
  handleConfirmationModalDelete,
  handleGetProductForUpdate,
  handleGetProductForSellAll,
}) {
  return (
    <div className="flex flex-col lg:w-1/3  bg-white rounded-lg mx-2 text-center my-2 ">
      <div>
        <div className="flex flex-row items-center border-b justify-around ">
          <h2 className="basis-2/4 text-sm items-center font-bold p-2 text-gray-500 ">
            {product.name}
          </h2>

          <div className="w-full flex justify-end mr-2 ">
            <div className="border-r mr-2">
              <i className="las la-balance-scale h-6 w-6  text-sm rounded-full text-center pt-0.5 mr-2   border "></i>
              <i
                onClick={() => handleGetProductForSellAll(product)}
                className="las la-exchange-alt h-6 w-6   text-sm rounded-full text-center pt-0.5 mr-2   border "
              ></i>
            </div>
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
        <div className="flex flex-row justify-around items-center  mx-auto p-1  text-xs ">
          <div className="flex flex-col mx-1 ">
            <p className="mr-1 font-thin ">Inicio</p>
            <p> {product.quantity}</p>
          </div>
          <div className="flex flex-col  mx-1 ">
            <p className="mr-1 font-thin">Entrada</p>
            <p>{product.entry}</p>
          </div>
          <div className="flex flex-col   mx-1 ">
            <p className="mr-1 ">A Venta</p>
            <p> {product.quantity + product.entry}</p>
          </div>
          <div className="flex flex-col  items-center mx-1 ">
            <p className="mr-1 ">Vendidos</p>
            <p> {product.quantity_sold}</p>
          </div>
          <div className="flex flex-col  items-center mx-1 ">
            <p className="mr-1">Venta</p>
            <p> $ {product.price * product.quantity_sold}</p>
          </div>
          <div className="flex flex-col text-center ">
            <p className="mr-1 ">Final</p>
            <p
              className={`${
                product.quantity + product.quantity + product.entry == 0
                  ? "bg-red-600 animate-pulse"
                  : product.quantity + product.entry < 10
                  ? " bg-yellow-500"
                  : "bg-green-600 "
              } flex flex-row px-2   text-white rounded-full   mx-auto items-center lg:border-none `}
            >
              {product.quantity + product.entry - product.quantity_sold}
            </p>
          </div>
        </div>
      </div>
      <div className="text-xs flex flex-row container justify-center rounded-b-lg border-t">
        <div className="flex mx-2">
          <p>Compra:</p>
          <p className="mx-2">{product.cost} </p>
        </div>
        <div className="flex mx-2">
          <p>Venta:</p> 
          <p className="mx-2">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
