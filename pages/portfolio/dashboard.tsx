import type { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import NFTCard from "../../components/NFTCard/NFTCard";
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
  EmptyWrapper,
  BuyAndSellWrapper,
} from "../../styles/DashboardStyled";
import StoreType from "../../types/StoreType";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../../constants/colors";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartData } from "../../helpers/mocks";
import Collapsable from "../../components/Collapsable/Collapsable";

const NFTDashboard: NextPage = () => {
  const { isInitialized } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const { fetch: getWishlist } = useMoralisQuery("Wishlist");
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const {
    data: wishlist,
    isLoading: isWishlistLoading,
    hasError: hasErrorWishlist,
  } = useSelector((store: StoreType) => store.portfolio.wishlist);

  useEffect(() => {
    if (isInitialized) {
      dispatch(getWishlistNFTs({ getWishlist }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, getWishlist, dispatch]);

  return (
    <Main>
      <Section>
        <Title>NFT Portfolio</Title>
        <Table>
          <Thead>
            <Tr style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }}>
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
          <Tbody style={{ color: isDarkMode ? COLORS.WHITE : COLORS.GREY_800 }}>
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
            <DataLabel>ESTIMATED VALUE</DataLabel>
            <Data hasColor={false}>$450.00</Data>
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
        <ErrorBanner hasError={hasErrorWishlist} />
        <Collapsable isOpen title="Wishlist">
          <Carousel size={wishlist.length} isLoading={isWishlistLoading}>
            {wishlist.map((nft) => (
              <NFTCard data={nft} key={nft.tokenId} />
            ))}
          </Carousel>
          <EmptyWrapper>
            <EmptyState
              message="No items to display"
              isEmpty={wishlist.length === 0 && !hasErrorWishlist && !isWishlistLoading}
            />
          </EmptyWrapper>
        </Collapsable>
        <BuyAndSellWrapper>
          <Collapsable isOpen title="Buy and sell history">
            {}
          </Collapsable>
        </BuyAndSellWrapper>
      </Section>
    </Main>
  );
};

export default NFTDashboard;
