import React, { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabaseClient";
export const ProductsContext = createContext();
export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(null);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await supabase.from("product").select().order('id');
      await setProducts(data);
      if (error) setError(error);
      return;
    };
    await getData();
  }, [products]);

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductsContext.Provider>
  );
};
