import { ProductsProvider } from "../context/ProductsContext";
import "../styles/globals.css";
import Head from "next/head";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });

  const updateSupabaseCookie = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

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
