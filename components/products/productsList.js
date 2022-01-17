import ProductCard from "./productCard";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { updateProduct } from "../../utils/products";

export default function ProductList() {
  const [products, setProducts] = useContext(ProductsContext);

  const handleProductUpdate = async (id, count) => {
    console.log("handle Product Update");
    const prod = products.find((product) => product.id == id);
    if (count > 0 && prod.quantity - count >= 0) {
      prod.quantity = prod.quantity - count;
      prod.quantity_sold = prod.quantity_sold + count;

      const { error } = updateProduct(prod, count);

      if (!error) {
        const index = products.indexOf(prod);
        let _products = [...products];
        _products[index] = prod;
        setProducts(_products);
      }
    }
  };

  return products ? (
    <div className=" flex flex-col lg:grid  lg:grid-cols-6 justify-items-center">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          handleProductUpdate={handleProductUpdate}
        />
      ))}
    </div>
  ) : (
    <div>Loading</div>
  );
}
