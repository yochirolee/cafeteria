import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
import ProductsList from "../components/products/productsList";
import { ProductsContext } from "../context/ProductsContext";
import AuthLayout from "../layout/AuthLayout";

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
    <AuthLayout>
      <ProductsList />
    </AuthLayout>
  );
}
