import type { NextPage } from "next";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "web3uikit";
import Carousel from "../components/Carousel/Carousel";
import NFTCard from "../components/NFTCard/NFTCard";
import { getNFTs } from "../config/landingSlice";
import type { AppDispatch } from "../config/store";
import {
  About,
  AboutCircle,
  AboutDescription,
  AboutTitle,
  AboutWrapper,
  CarouselWrapper,
  DesktopOnly,
  Featured,
  FeaturedTitle,
  Hero,
  HeroTitle,
  LoadingWrapper,
  MobileOnly,
} from "../styles/HomeStyled";
import StoreType from "../types/StoreType";

const Home: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const { nfts, isLoading } = useSelector((store: StoreType) => store.landing);
  const dispatch = useDispatch<AppDispatch>();
  const ADDRESS: string = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const CHAIN = "0x1";

  useEffect(() => {
    if (isInitialized) {
      dispatch(
        getNFTs({
          account: Moralis.Web3API.account,
          address: ADDRESS,
          chain: CHAIN,
          limit: 20,
        })
      );
    }
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  return (
    <Fragment>
      <Hero>
        <HeroTitle>MULLETVERSE</HeroTitle>
      </Hero>
      <About>
        <AboutWrapper>
          <AboutTitle>The Mulletverse</AboutTitle>
          <AboutDescription>
            Always delivering an innovative approach.
          </AboutDescription>
        </AboutWrapper>
        <AboutCircle>
          <DesktopOnly>
            <Image
              alt="Boxer"
              src="/assets/purple-boxer.png"
              width={280}
              height={500}
            />
          </DesktopOnly>
          <MobileOnly>
            <Image
              alt="Boxer"
              src="/assets/purple-boxer.png"
              width={170}
              height={300}
            />
          </MobileOnly>
        </AboutCircle>
      </About>
      <Featured>
        <FeaturedTitle>Featured Artists</FeaturedTitle>
        {isLoading && (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        )}
        {!isLoading && (
          <CarouselWrapper>
            <Carousel size={nfts.length}>
              {nfts.map((nft, index) => (
                <NFTCard data={nft} key={index} />
              ))}
            </Carousel>
          </CarouselWrapper>
        )}
      </Featured>
    </Fragment>
  );
};

export default Home;
