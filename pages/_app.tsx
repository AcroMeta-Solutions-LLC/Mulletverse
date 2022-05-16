import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import THEME from "../constants/theme";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { MoralisProvider } from "react-moralis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import RouteGuard from "../components/RouteGuard";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../config/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={THEME.LIGHT}>
          <ToastContainer />
          <MoralisProvider
            appId={process.env.NEXT_PUBLIC_APP_ID || ""}
            serverUrl={process.env.NEXT_PUBLIC_SERVER_URL || ""}
          >
            <Head>
              <title>MulletVerse</title>
              <meta name="description" content="Simplify Web3 by providing an NFT marketplace" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <RouteGuard>
              <Component {...pageProps} />
            </RouteGuard>
            <Footer />
          </MoralisProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
