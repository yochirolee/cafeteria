import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import { ProductsContext } from "../context/ProductsContext";
import Head from "next/head";

export default function Home() {
  const [session, setSession] = useState(null);
  const [products, setProducts] = useContext(ProductsContext);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(async () => {
    const getData = async () => {
      const { data, error } = await supabase.from("product").select();
      await setProducts(data);
      if (error) setError(error);
      return;
    };
    await getData();
  }, []);

  return (
    <div>
      <NavBar />
      <ProductsList />
    </div>
  );
}
