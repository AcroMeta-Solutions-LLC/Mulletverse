import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Select } from "web3uikit";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { clearStore, getCollectionNFTs, setCollectionChain } from "../../config/portfolioSlice";
import { AppDispatch } from "../../config/store";
import { CHAINS } from "../../constants/chains";
import { Main, Container, Title, GridSection, Filters } from "../../styles/CollectionStyled";
import { ChainType } from "../../types/ChainType";
import StoreType from "../../types/StoreType";

const YourCollection: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const PAGE_SIZE = 20;
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError, chain } = useSelector(
    (store: StoreType) => store.portfolio.collection,
  );

  useEffect(() => {
    if (isInitialized) dispatch(getCollectionNFTs({ chain, account: Moralis.Web3API.account, limit: PAGE_SIZE }));
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis.Web3API.account, dispatch, chain]);

  const onPreviousPage = () => {
    dispatch(
      getCollectionNFTs({
        account: Moralis.Web3API.account,
        chain,
        limit: PAGE_SIZE,
        cursor: previousCursor[previousCursor.length - 2],
      }),
    );
  };

  const onNextPage = () => {
    dispatch(getCollectionNFTs({ chain, account: Moralis.Web3API.account, limit: PAGE_SIZE, cursor: nextCursor }));
  };

  return (
    <Main>
      <Filters>
        <Select
          defaultOptionIndex={0}
          onChange={({ id }) => dispatch(setCollectionChain(id as ChainType))}
          options={CHAINS}
          prefixText="Chain:"
          value={chain}
        />
      </Filters>
      <Container>
        <Title>Your Collection</Title>
        <EmptyState isEmpty={data.length === 0 && !hasError && !isLoading} />
        <ErrorBanner hasError={hasError} />
        <GridSection>
          <NFTGrid
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            size={PAGE_SIZE}
            total={total}
            data={data}
            isLoading={isLoading}
            page={page}
          />
        </GridSection>
      </Container>
    </Main>
  );
};

export default YourCollection;
