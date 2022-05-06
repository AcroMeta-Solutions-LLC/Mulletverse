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
  AboutTitle,
  FeaturedTitle,
  MobileOnly,
  DesktopOnly,
} from "../styles/HomeStyled";
import { useMoralis } from "react-moralis";
import Slider from "react-slick";
import { NFT } from "web3uikit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: NextPage = () => {
  const { authenticate } = useMoralis();

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  return (
    <Fragment>
      <Head>
        <title>MulletVerse</title>
        <meta name="description" content="Simplify Web3 by providing an NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <HeroTitle>MULLETVERSE</HeroTitle>
        <button onClick={() => authenticate()}>Authenticate</button>
      </Hero>
      <About>
        <AboutWrapper>
          <AboutTitle>The Mulletverse</AboutTitle>
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
        <FeaturedTitle>Featured Artists</FeaturedTitle>
        <Slider {...settings}>
          <NFT address="0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB" chain="eth" fetchMetadata tokenId="1" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="2280" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="19788" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="10786" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="2687" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="17119" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="6963" />
          <NFT address="0x306b1ea3ecdf94aB739F1910bbda052Ed4A9f949" chain="eth" fetchMetadata tokenId="892" />
        </Slider>
      </Featured>
    </Fragment>
  );
};

export default Home;
