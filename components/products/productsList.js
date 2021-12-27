import ProductCard from "./productCard";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { supabase } from "../../utils/supabaseClient";

export default function ProductList() {
  const [products, setProducts] = useContext(ProductsContext);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await supabase.from("product").select();
      await setProducts(data);
      if (error) setError(error);
      return;
    };
    await getData();
  }, []);

  const handleProductUpdate = async (id, count) => {
    const prod = products.find((product) => product.id == id);

    if (count > 0 && prod.quantity - count >= 0) {
      prod.quantity = prod.quantity - count;
      prod.quantitySold = prod.quantitySold + count;

      const { error } = await supabase
        .from("product")
        .update({
          quantity: prod.quantity,
          quantitySold: prod.quantitySold,
        })
        .match({ id: prod.id });
      if (!error) {
        const index = products.indexOf(prod);
        let _products = [...products];
        _products[index] = prod;
        setProducts(_products);
      }
    }
  };

  if (error) return <div>{error.message}</div>;

  return products ? (
    <div className="grid  grid-cols-2 lg:grid-cols-5  justify-items-center">
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
