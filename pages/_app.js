import { ProductsProvider } from "../context/ProductsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  );
}

export default MyApp;
