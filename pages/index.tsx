import type { NextPage } from "next";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NFT, INFTProps, Loading } from "web3uikit";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  FeaturedSlider,
  NFTWrapper,
  Chevron,
  SliderWrapper,
  ButtonNFTBuy,
  LoadingWrapper,
} from "../styles/HomeStyled";

const Home: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const [nfts, setNfts] = useState<INFTProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const ADDRESS: string = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const CHAIN = "eth";

  useEffect(() => {
    if (isInitialized) {
      setIsLoading(true);
      Moralis.Web3API.account
        .getNFTs({ address: ADDRESS, chain: CHAIN, limit: 20 })
        .then((response) => {
          const nftList: INFTProps[] =
            response.result?.map((data) => ({
              address: data.token_address,
              chain: CHAIN,
              tokenId: data.token_id,
              fetchMetadata: false,
              name: data.name,
              metadata: data.metadata ? JSON.parse(data.metadata) : {},
            })) || [];
          setNfts(nftList);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isInitialized, Moralis.Web3API.account]);

  const scrollSlider = (direction: "left" | "right") => {
    const offset = sliderRef.current && sliderRef.current.offsetWidth ? sliderRef.current.offsetWidth : 0;
    switch (direction) {
      case "left":
        sliderRef?.current?.scrollTo({ left: sliderRef?.current.scrollLeft - offset });
        break;
      case "right":
        sliderRef?.current?.scrollTo({ left: sliderRef?.current.scrollLeft + offset });
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Hero>
        <HeroTitle>MULLETVERSE</HeroTitle>
      </Hero>
      <About>
        <AboutWrapper>
          <AboutTitle>The Mulletverse</AboutTitle>
          <AboutDescription>Always delivering an innovative approach.</AboutDescription>
        </AboutWrapper>
        <AboutCircle>
          <DesktopOnly>
            <Image alt="Boxer" src="/assets/purple-boxer.png" width={280} height={500} />
          </DesktopOnly>
          <MobileOnly>
            <Image alt="Boxer" src="/assets/purple-boxer.png" width={170} height={300} />
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
          <SliderWrapper>
            <FeaturedSlider ref={sliderRef}>
              {nfts.map((nft) => (
                <NFTWrapper key={nft.tokenId}>
                  <NFT {...nft} />
                  <ButtonNFTBuy>BUY</ButtonNFTBuy>
                </NFTWrapper>
              ))}
            </FeaturedSlider>
            {nfts.length > 0 && (
              <Fragment>
                <Chevron position="left" onClick={() => scrollSlider("left")}>
                  <FiChevronLeft size={30} />
                </Chevron>
                <Chevron position="right" onClick={() => scrollSlider("right")}>
                  <FiChevronRight size={30} />
                </Chevron>
              </Fragment>
            )}
          </SliderWrapper>
        )}
      </Featured>
    </Fragment>
  );
};

export default Home;
