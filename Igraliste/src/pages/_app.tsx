import "../styles/bootstrap.min.css";
import "../styles/util.css";
import "../styles/globals.css";
import "../styles/style.css";

import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";

import { AuthProvider } from "@/context/FormDataContext";
import { ProductsProvider } from "@/context/ProductContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideFooterHeader =
    router.pathname.includes("/register") ||
    router.pathname.includes("/login") ||
    router.pathname.includes("/MyProfile") ||
    router.pathname.includes("/orderForm");
  //console.log(router);

  return (
    <>
      {" "}
      <AuthProvider>
        {!hideFooterHeader && <Header />}
        <ProductsProvider>
          <Component {...pageProps} />
        </ProductsProvider>
        {!hideFooterHeader && <Footer />}{" "}
      </AuthProvider>
    </>
  );
}
