import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Image from "next/image";
import {
  About,
  Hero,
  HeroTitle,
  AboutCircle,
  Featured,
  AboutWrapper,
  AboutDescription,
  Title,
  MobileOnly,
  DesktopOnly,
} from "../styles/HomeStyled";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>MulletVerse</title>
        <meta name="description" content="Simplify Web3 by providing an NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <HeroTitle>MULLETVERSE</HeroTitle>
      </Hero>
      <About>
        <AboutWrapper>
          <Title>The Mulletverse</Title>
          <AboutDescription>Always delivering an innovative approach.</AboutDescription>
        </AboutWrapper>
        <AboutCircle>
          <DesktopOnly>
            <Image alt="Boxer" src="/assets/purple-boxer.png" width={250} height={500} />
          </DesktopOnly>
          <MobileOnly>
            <Image alt="Boxer" src="/assets/purple-boxer.png" width={150} height={300} />
          </MobileOnly>
        </AboutCircle>
      </About>
      <Featured>
        <Title>Featured Artists</Title>
      </Featured>
    </Fragment>
  );
};

export default Home;
