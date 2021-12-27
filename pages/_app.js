import { ProductsProvider } from "../context/ProductsContext";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsProvider>
      <Head>
        <title>El Triunfo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          alt="true"
        />
      </Head>

      <Component {...pageProps} />
    </ProductsProvider>
  );
}

export default MyApp;
