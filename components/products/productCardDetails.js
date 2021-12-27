export default function ProductCardDetails({
  quantity,
  quantitySold,
  salePrice,
}) {
  return (
    <div className="flex flex-row justify-evenly   w-full  m-2 text-xs ">
      <div className="flex flex-col items-center ">
        <p>Vendidos</p>
        <p>{quantitySold}</p>
      </div>
      <div className="flex flex-col items-center ">
        <p>Existencia</p>
        <p>{quantity}</p>
      </div>
      <div className="flex flex-col items-center font-bold ">
        <p>Venta</p>
        <p className="font-bold text-green-700">{salePrice * quantitySold} $</p>
      </div>
    </div>
  );
}
