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
import {
  Section,
  IncomeTracker,
  Main,
  Title,
  DataArea,
  ChartArea,
  DataLabel,
  Data,
} from "../../styles/DashboardStyled";
import StoreType from "../../types/StoreType";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../../constants/colors";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartData } from "./mocks";

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
      <Section>
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
      </Section>
      <Section>
        <Title>NFT Income Tracker</Title>
        <IncomeTracker>
          <DataArea>
            <DataLabel>TOTAL SPENT</DataLabel>
            <Data hasColor={false}>$400.00</Data>
            <DataLabel>ACTUAL COLLECTION</DataLabel>
            <Data hasColor>$450.00</Data>
          </DataArea>
          <ChartArea>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  isAnimationActive={false}
                  dataKey="value"
                  data={ChartData}
                  label={(e) => `${e.name} - ${e.value}%`}
                >
                  {ChartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartArea>
        </IncomeTracker>
      </Section>
      <Section>
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
      </Section>
    </Main>
  );
};

export default NFTDashboard;
