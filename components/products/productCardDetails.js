export default function ProductCardDetails({
  quantity,
  quantitySold,
  salePrice,
}) {
  return (
    <div className="flex flex-col  w-full rounded-b-lg ">
      <div className="flex flex-row text-xs mx-auto items-center border-b border-dashed lg:border-none ">
        <p className="mr-2 ">Venta</p>
        <p className="font-bold text-gray-600 m-2 p-1  rounded-lg border border-gray-300">${salePrice * quantitySold} </p>
      </div>
    <div className="flex flex-row justify-around p-1  text-xs ">
      <div className="flex flex-col items-center mx-2 ">
        <p>Vendidos</p>
        <p>{quantitySold}</p>
      </div>
      <div className="flex flex-col items-center mx-2 ">
        <p>Existencia</p>
        <p>{quantity}</p>
      </div>
      
    </div>
    </div>
  );
}
