import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { Icon, Select } from "web3uikit";
import NFTGrid from "../components/NFTGrid/NFTGrid";
import { searchNFTs } from "../config/searchSlice";
import { AppDispatch } from "../config/store";
import { CHAINS } from "../constants/chains";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ChainType } from "../types/ChainType";
import StoreType from "../types/StoreType";
import { Collections as CollectionsMock } from "../helpers/mocks";
import CollectionCard from "../components/CollectionCard/CollectionCard";
import {
  Chevron,
  Collections,
  CollectionTitleWrapper,
  ContentWrapper,
  FilterApply,
  FilterArea,
  FilterButton,
  FilterCheckbox,
  FilterInput,
  FilterLabel,
  FilterPriceRow,
  FilterRow,
  Header,
  FilterSelect,
  FilterTitle,
  FilterWrapper,
  Main,
  SearchingFor,
  SearchingWrapper,
  Title,
  Wrapper,
} from "../styles/SearchStyled";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";

const Search: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const [chain, setChain] = useState<ChainType>("eth");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const { query } = useRouter();
  const theme: any = useTheme();
  const searchValue: string = Array.isArray(query.value) ? query.value[0] : query.value || "";
  const PAGE_SIZE = 100;
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError } = useSelector(
    (store: StoreType) => store.search,
  );

  useEffect(() => {
    if (isInitialized && searchValue) {
      const options = { q: searchValue, chain, filter: "name", limit: PAGE_SIZE };
      dispatch(searchNFTs({ token: Moralis.Web3API.token, options }));
    }
  }, [isInitialized, searchValue, chain, dispatch, Moralis]);

  const onPreviousPage = () => {
    const options = { q: searchValue, chain, filter: "name", limit: PAGE_SIZE };
    dispatch(searchNFTs({ token: Moralis.Web3API.token, options, cursor: previousCursor[previousCursor.length - 2] }));
  };

  const onNextPage = () => {
    const options = { q: searchValue, chain, filter: "name", limit: PAGE_SIZE };
    dispatch(searchNFTs({ token: Moralis.Web3API.token, options, cursor: nextCursor }));
  };

  const applyFilter = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Main>
      <Header>
        <SearchingWrapper>
          <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Icon size={28} svg="list" fill={theme.TITLE} />
          </FilterButton>
          <SearchingFor>Searching for {`"${searchValue}"`}</SearchingFor>
        </SearchingWrapper>
        <Select
          defaultOptionIndex={0}
          onChange={({ id }) => setChain(id as ChainType)}
          options={CHAINS}
          prefixText="Chain:"
          value={chain}
        />
      </Header>
      <Wrapper>
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
              <FilterSelect>
                <option>Low to high</option>
                <option>High to low</option>
              </FilterSelect>
            </FilterWrapper>
          )}
        </FilterArea>
        <ContentWrapper>
          <ErrorBanner hasError={hasError} />
          <CollectionTitleWrapper>
            <Title>Collection results</Title>
            <div>
              <Chevron>
                <FiChevronLeft size={28} />
              </Chevron>
              <Chevron>
                <FiChevronRight size={28} />
              </Chevron>
            </div>
          </CollectionTitleWrapper>
          <Collections>
            {CollectionsMock.slice(0, 2).map((collection) => (
              <CollectionCard key={collection.address} collection={collection} />
            ))}
          </Collections>
          <Title>{total} items</Title>
          <NFTGrid
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            size={PAGE_SIZE}
            total={total}
            data={data.filter((nft) => nft.metadata)}
            isLoading={isLoading}
            page={page}
          />
        </ContentWrapper>
      </Wrapper>
    </Main>
  );
};

export default Search;
