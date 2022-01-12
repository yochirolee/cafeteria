import ProductCardDetails from "./productCardDetails";
import ProductCardName from "./productCardName";
import ProductCardImage from "./productCardImage";
import ProductCardActions from "./productCardActions";

export default function ProductCard({
  product,
  handleProductUpdate,
  updating,
  setUpdating,
}) {
  return (
    <div className="flex lg:flex-col  items-center m-2   bg-white rounded-xl lg:w-5/6 ">
      <div className="flex flex-col m-2 items-center justify-between">
        <ProductCardName name={product.name} />
        <p className="items-center text-md inline-flex text-sm rounded-lg lg:border lg:bg-gray-600  lg:shadow-lg px-2 lg:font-bold lg:text-white">
          <span className="text-xs pr-2">Precio: </span>${product.salePrice}
        </p>
      </div>

      <div className="lg:border-b lg:border-dashed lg:w-full lg:mt-2"></div>
      <ProductCardDetails
        quantity={product.quantity}
        quantitySold={product.quantitySold}
        salePrice={product.salePrice}
      />
      <div className=" lg:border-b lg:border-dashed lg:w-full lg:mt-2"></div>

      <ProductCardActions
        prod={product}
        handleProductUpdate={handleProductUpdate}
      />
    </div>
  );
}
