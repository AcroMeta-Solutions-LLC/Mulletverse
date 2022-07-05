import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Icon, Select } from "web3uikit";
import EmptyState from "../components/EmptyState/EmptyState";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";
import NFTGrid from "../components/NFTGrid/NFTGrid";
import { clearStore, getMarketplaceNFTs } from "../config/marketplaceSlice";
import { AppDispatch } from "../config/store";
import { CHAINS } from "../constants/chains";
import { ChainType } from "../types/ChainType";
import StoreType from "../types/StoreType";
import {
  Container,
  FilterApply,
  FilterArea,
  FilterButton,
  FilterCheckbox,
  FilterContainer,
  FilterIconLabel,
  FilterInput,
  FilterLabel,
  FilterPriceRow,
  FilterRow,
  FilterSelect,
  FilterTitle,
  FilterWrapper,
  GridSection,
  Header,
  Main,
  Tab,
  TabRow,
} from "../styles/MarketplaceStyled";

const Marketplace: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useRouter();
  const PAGE_SIZE = 20;
  const [chain, setChain] = useState<ChainType>("matic");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const theme: any = useTheme();
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError } = useSelector(
    (store: StoreType) => store.marketplace.main,
  );

  useEffect(() => {
    if (isInitialized) dispatch(getMarketplaceNFTs({ token: Moralis.Web3API.token, limit: PAGE_SIZE, chain }));
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis, dispatch, chain]);

  const onPreviousPage = () => {
    dispatch(
      getMarketplaceNFTs({
        token: Moralis.Web3API.token,
        limit: PAGE_SIZE,
        cursor: previousCursor[previousCursor.length - 2],
        chain,
      }),
    );
  };

  const onNextPage = () => {
    dispatch(getMarketplaceNFTs({ token: Moralis.Web3API.token, limit: PAGE_SIZE, cursor: nextCursor, chain }));
  };

  const applyFilter = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Main>
      <Header>
        <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Icon size={28} svg="list" fill={theme.TITLE} />
          <FilterIconLabel>Filters</FilterIconLabel>
        </FilterButton>
        <TabRow>
          <Link href="/marketplace">
            <Tab isActive={pathname === "/marketplace"}>Marketplace</Tab>
          </Link>
          <Link href="/marketplace/featured">
            <Tab isActive={pathname === "/marketplace/featured"}>Featured Artists</Tab>
          </Link>
        </TabRow>
        <Select
          defaultOptionIndex={0}
          onChange={({ id }) => setChain(id as ChainType)}
          options={CHAINS}
          prefixText="Chain:"
          value={chain}
        />
      </Header>
      <FilterContainer isFilterOpen={isFilterOpen}>
        <FilterArea isFilterOpen={isFilterOpen}>
          {isFilterOpen && (
            <FilterWrapper onSubmit={applyFilter}>
              <FilterTitle>Status</FilterTitle>
              <FilterRow>
                <FilterLabel>Buy now</FilterLabel>
                <FilterCheckbox type="checkbox" />
              </FilterRow>
              <FilterRow>
                <FilterLabel>On auction</FilterLabel>
                <FilterCheckbox type="checkbox" />
              </FilterRow>
              <FilterTitle>Price</FilterTitle>
              <FilterPriceRow>
                <FilterSelect>
                  <option>USD</option>
                  <option>ETH</option>
                  <option>MATIC</option>
                  <option>BNB</option>
                </FilterSelect>
                <FilterInput type="text" placeholder="Min" />
                <FilterLabel>to</FilterLabel>
                <FilterInput type="text" placeholder="Max" />
              </FilterPriceRow>
              <FilterApply type="submit" value="Apply" />
            </FilterWrapper>
          )}
        </FilterArea>
        <Container>
          <EmptyState isEmpty={data.filter((nft) => nft.metadata).length === 0 && !hasError && !isLoading} />
          <ErrorBanner hasError={hasError} />
          <GridSection>
            <NFTGrid
              onNext={onNextPage}
              onPrevious={onPreviousPage}
              size={PAGE_SIZE}
              total={total}
              data={data.filter((nft) => nft.metadata).map((nft) => ({ ...nft, chain }))}
              isLoading={isLoading}
              page={page}
            />
          </GridSection>
        </Container>
      </FilterContainer>
    </Main>
  );
};

export default Marketplace;
