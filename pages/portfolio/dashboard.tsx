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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../../constants/colors";

const NFTDashboard: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const PAGE_SIZE_WISHLIST = 10;
  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    hasError: hasErrorWishlist,
  } = useSelector((store: StoreType) => store.portfolio.wishlist);

  useEffect(() => {
    if (isInitialized) {
      dispatch(getWishlistNFTs({ account: Moralis.Web3API.account, limit: PAGE_SIZE_WISHLIST }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  return (
    <Main>
      <Container>
        <Title>NFT Dashboard</Title>
        <Table>
          <Thead>
            <Tr style={{ backgroundColor: COLORS.PURPLE.DARK, color: COLORS.WHITE }}>
              <Th></Th>
              <Th>Collection</Th>
              <Th>Floor Price</Th>
              <Th>24h %</Th>
              <Th>Volume</Th>
              <Th>24h %</Th>
              <Th>Quantity</Th>
              <Th>Total Holdings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(8)].map((_, i) => (
              <Tr key={i}>
                <Td>Tablescon</Td>
                <Td>9 April 2019</Td>
                <Td>East Annex</Td>
                <Td>Tablescon</Td>
                <Td>9 April 2019</Td>
                <Td>East Annex</Td>
                <Td>9 April 2019</Td>
                <Td>Tablescon</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Title>NFT Income Tracker</Title>
        <Title>Wishlist</Title>
        <EmptyState
          message="Nothing on your wishlist"
          isEmpty={wishlist.length === 0 && !hasErrorWishlist && !isWishlistLoading}
        />
        <ErrorBanner hasError={hasErrorWishlist} />
        <Carousel size={wishlist.length} isLoading={isWishlistLoading}>
          {wishlist.map((nft) => (
            <NFTBuyCard data={nft} key={nft.tokenId} />
          ))}
        </Carousel>
      </Container>
    </Main>
  );
};

export default NFTDashboard;
