import type { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import NFTBuyCard from "../../components/NFTBuyCard/NFTBuyCard";
import { clearStore, getWishlistNFTs } from "../../config/portfolioSlice";
import { AppDispatch } from "../../config/store";
import { Container, Main, Title } from "../../styles/DashboardStyled";
import StoreType from "../../types/StoreType";

const NFTDashboard: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const PAGE_SIZE = 10;
  const { data: wishlist, isLoading, hasError } = useSelector((store: StoreType) => store.portfolio.wishlist);

  useEffect(() => {
    if (isInitialized) dispatch(getWishlistNFTs({ account: Moralis.Web3API.account, limit: PAGE_SIZE }));
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  return (
    <Main>
      <Container>
        <Title>NFT Dashboard</Title>
        <Title>NFT Income Tracker</Title>
        <Title>Wishlist</Title>
        <EmptyState message="Nothing on your wishlist" isEmpty={wishlist.length === 0 && !hasError && !isLoading} />
        <ErrorBanner hasError={hasError} />
        <Carousel size={wishlist.length}>
          {wishlist.map((nft) => (
            <NFTBuyCard data={nft} key={nft.tokenId} />
          ))}
        </Carousel>
      </Container>
    </Main>
  );
};

export default NFTDashboard;
