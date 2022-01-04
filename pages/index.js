import NavBar from "../components/NavBar/navbar";
import ProductsList from "../components/products/productsList";
import AuthLayout from "../layout/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>
      <NavBar/>
      <ProductsList />
    </AuthLayout>
  );
}
