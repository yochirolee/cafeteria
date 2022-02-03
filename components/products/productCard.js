import ProductCardDetails from "./productCardDetails";
import ProductCardName from "./productCardName";
import ProductCardActions from "./productCardActions";

export default function ProductCard({
  product,
  handleProductUpdate,
 
}) {
  return (
    <div className="flex lg:flex-col  items-center m-2   bg-white rounded-xl lg:w-5/6 ">
      <div className="flex flex-col m-2 items-center justify-between">
        <ProductCardName name={product.name} />
        <p className="items-center text-md inline-flex text-sm rounded-lg lg:border lg:bg-gray-600  lg:shadow-lg px-2 lg:font-bold lg:text-white">
          <span className="text-xs pr-2">Precio: </span>${product.price}
        </p>
      </div>

      <div className="lg:border-b lg:border-dashed lg:w-full lg:mt-2"></div>
      <ProductCardDetails
        quantity={product.quantity+product.entry-product.quantity_sold}
        quantity_sold={product.quantity_sold}
        price={product.price}
      />
      <div className=" lg:border-b lg:border-dashed lg:w-full lg:mt-2"></div>

      <ProductCardActions
        prod={product}
        handleProductUpdate={handleProductUpdate}
      />
    </div>
  );
}
