import { useContext } from "react";
import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import { AuthContext } from "../context/AuthContext";
import authWrapper from "../lib/authWrapper";

export default function Home({ user }) {
  return (
    <>
      <NavBar user={user} />
      <ProductsList />
    </>
  );
}

export const getServerSideProps = authWrapper();
