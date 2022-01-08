import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import authWrapper from "../lib/authWrapper";

export default function Home() {
  return (
    <>
      <NavBar />
      <ProductsList />
    </>
  );
}

export const getServerSideProps = authWrapper();
