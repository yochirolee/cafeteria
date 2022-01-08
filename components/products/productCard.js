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
    <div className="flex flex-col  items-center m-2  border bg-white rounded-xl w-5/6 ">
      <ProductCardName name={product.name} />
      <p>${product.salePrice}</p>
      <ProductCardActions
        prod={product}
        handleProductUpdate={handleProductUpdate}
      />
      <div className="border-b border-dashed w-full mt-2"></div>
      <ProductCardDetails
        quantity={product.quantity}
        quantitySold={product.quantitySold}
        salePrice={product.salePrice}
      />
    </div>
  );
}
