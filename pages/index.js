import { useEffect } from "react";
import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import authWrapper from "../lib/authWrapper";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  useEffect(async() => {
    const user = async () => await supabase.auth.user; 
    console.log(user, "USER");
  });

 
  return (
    <>
      <NavBar />
      <ProductsList />
    </>
  );
}

export const getServerSideProps = authWrapper();
