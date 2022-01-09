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
    <div className="flex flex-col  items-center m-2   bg-white rounded-xl w-5/6 ">
      <ProductCardName name={product.name} />
      <p className="items-center flex flex-row rounded-lg border bg-gray-600  shadow-lg px-2 font-bold text-white">
        <span className="text-xs pr-2">Precio: </span>${product.salePrice}
      </p>

      <div className="border-b border-dashed w-full mt-2"></div>
      <ProductCardDetails
        quantity={product.quantity}
        quantitySold={product.quantitySold}
        salePrice={product.salePrice}
      />
      <div className="border-b border-dashed w-full mt-2"></div>

      <ProductCardActions
        prod={product}
        handleProductUpdate={handleProductUpdate}
      />
    </div>
  );
}
