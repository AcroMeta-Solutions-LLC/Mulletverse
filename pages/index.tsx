import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { Container, Title } from "../styles/HomeStyled";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>MulletVerse</title>
        <meta name="description" content="Simplify Web3 by providing an NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Title>MulletVerse</Title>
      </Container>
    </Fragment>
  );
};

export default Home;
