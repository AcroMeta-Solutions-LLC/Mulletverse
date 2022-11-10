import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Auth from "../components/auth";
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { Web3AuthProvider } from "../services/web3auth";
import Setting from "../components/setting";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [web3AuthNetwork, setWeb3AuthNetwork] =
    useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("mainnet");

  return (
    <div className={styles.container}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <h1 className={styles.title}>Choose Your Login Network</h1>
        <Setting setNetwork={setWeb3AuthNetwork} setChain={setChain} />
        <Auth />
      </Web3AuthProvider>
    </div>
  );
};

export default Home;
