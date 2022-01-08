export default function ProductCardDetails({
  quantity,
  quantitySold,
  salePrice,
}) {
  return (
    <div className="flex flex-col  w-full rounded-b-lg">
      <div className="flex flex-row text-xs mx-auto items-center ">
        <p className="mr-2 ">Venta</p>
        <p className="font-bold text-white m-2 p-1 rounded-lg bg-green-600">${salePrice * quantitySold} </p>
      </div>
    <div className="flex flex-row justify-around  text-xs ">
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
