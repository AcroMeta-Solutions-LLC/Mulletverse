import type { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Loading, NFT } from "web3uikit";
import Carousel from "../components/Carousel/Carousel";
import NFTBuyCard from "../components/NFTBuyCard/NFTBuyCard";
import { getNFTs } from "../config/marketplaceSlice";
import { AppDispatch } from "../config/store";
import { GridSection, LoadingWrapper, Main, Section, Title } from "../styles/MarketplaceStyled";
import StoreType from "../types/StoreType";

const Marketplace: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const { nfts, isLoading } = useSelector((store: StoreType) => store.marketplace);

  const dispatch = useDispatch<AppDispatch>();
  const ADDRESS: string = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const CHAIN = "eth";

  useEffect(() => {
    if (isInitialized) {
      dispatch(getNFTs({ account: Moralis.Web3API.account, address: ADDRESS, chain: CHAIN, limit: 20 }));
    }
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  return (
    <Main>
      <Section>
        <Title>Featured Artists</Title>
        {isLoading && (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        )}
        {!isLoading && (
          <Carousel size={nfts.length}>
            {nfts.map((nft) => (
              <NFTBuyCard data={nft} key={nft.tokenId} />
            ))}
          </Carousel>
        )}
      </Section>
      <Section>
        <Title>Marketplace</Title>
        <GridSection>
          {nfts.slice(0, 12).map((nft) => (
            <NFTBuyCard data={nft} key={nft.tokenId} />
          ))}
        </GridSection>
      </Section>
      <Section>
        <Title>Minting Market</Title>
        {isLoading && (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        )}
        {!isLoading && (
          <Carousel size={nfts.length}>
            {nfts.map((nft) => (
              <NFTBuyCard data={nft} key={nft.tokenId} />
            ))}
          </Carousel>
        )}
      </Section>
    </Main>
  );
};

export default Marketplace;
