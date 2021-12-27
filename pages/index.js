import ProductCard from "../components/products/productCard";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import { ProductsProvider } from "../context/ProductsContext";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <ProductsProvider>
        <NavBar />
        <ProductsList />
      </ProductsProvider>
    </div>
  );
}
