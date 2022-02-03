import React, { useState, useEffect, createContext } from "react";
import { getProducts } from "../utils/products_lib";
export const ProductsContext = createContext();
export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await getProducts();
      error ? setError(error) : setProducts(data);
    };

    await getData();
  }, [products.length]);

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductsContext.Provider>
  );
};
