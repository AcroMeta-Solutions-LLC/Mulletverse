import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Icon, Select } from "web3uikit";
import NFTGrid from "../components/NFTGrid/NFTGrid";
import { searchNFTs } from "../config/searchSlice";
import { AppDispatch } from "../config/store";
import { CHAINS } from "../constants/chains";
import COLORS from "../constants/colors";
import {
  ContentWrapper,
  FilterArea,
  FilterButton,
  Filters,
  Main,
  SearchingFor,
  SearchingWrapper,
  Title,
  Wrapper,
} from "../styles/SearchStyled";
import { ChainType } from "../types/ChainType";
import StoreType from "../types/StoreType";

const Search: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const [chain, setChain] = useState<ChainType>("eth");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { query } = useRouter();
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

  const onNextPage = () => {};

  const onPreviousPage = () => {};

  return (
    <Main>
      <Filters>
        <SearchingWrapper>
          <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Icon size={28} svg="list" fill={COLORS.BLACK} />
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
      </Filters>
      <Wrapper>
        <FilterArea isFilterOpen={isFilterOpen}>{isFilterOpen && <span>filters</span>}</FilterArea>
        <ContentWrapper>
          <Title>Collection results</Title>
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
