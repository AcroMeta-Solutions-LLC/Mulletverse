import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import THEME from "../constants/theme";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { MoralisProvider } from "react-moralis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={THEME.LIGHT}>
      <ToastContainer />
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID || ""}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL || ""}
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </MoralisProvider>
    </ThemeProvider>
  );
}

export default MyApp;
