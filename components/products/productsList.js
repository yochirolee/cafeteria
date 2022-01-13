import ProductCard from "./productCard";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { supabase } from "../../utils/supabaseClient";

export default function ProductList() {
  const [products, setProducts] = useContext(ProductsContext);

  const handleProductUpdate = async (id, count) => {
    const prod = products.find((product) => product.id == id);
    console.log(prod)
    if (count > 0 && prod.quantity - count >= 0) {
      prod.quantity = prod.quantity - count;
      prod.quantity_sold = prod.quantity_sold + count;

      const { error } = await supabase
        .from("products")
        .update({
          quantity: prod.quantity,
          quantity_sold: prod.quantity_sold,
        })
        .match({ id: prod.id });

      let { data: product, error: salesError } = await supabase
        .from("sales")
        .insert([
          {
            product_id: prod.id,
            quantity: count,
            sale_price:prod.price
          },
        ])
        .single();

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
