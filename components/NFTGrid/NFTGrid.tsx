import { useState } from "react";
import { INFTProps, Skeleton } from "web3uikit";
import NFTBuyCard from "../NFTBuyCard/NFTBuyCard";
import { CardWrapper, Container, Grid, LoadingWrapper, PageButton } from "./NFTGridStyled";

type NFTGridType = {
  data: INFTProps[];
  size: number;
  isLoading?: boolean;
  onNext: Function;
  onPrevious: Function;
  total: number;
  page: number;
};

function NFTGrid(props: NFTGridType) {
  const hasPreviousPage = () => {
    return props.page > 0;
  };

  const hasNextPage = () => {
    return props.page < Math.floor(props.total / props.size);
  };

  const onPreviousPage = () => {
    if (!hasPreviousPage()) return;
    props.onPrevious();
  };

  const onNextPage = () => {
    if (!hasNextPage()) return;
    props.onNext();
  };

  const renderLoading = () => {
    return [...Array(props.size)].map((_, i) => (
      <CardWrapper key={i}>
        <Skeleton theme="image" height="300px" width="250px"></Skeleton>
      </CardWrapper>
    ));
  };

  return props.isLoading ? (
    <LoadingWrapper>{renderLoading()}</LoadingWrapper>
  ) : (
    <Container>
      <Grid>
        {props.data.map((nft) => (
          <CardWrapper key={nft.tokenId}>
            <NFTBuyCard data={nft} />
          </CardWrapper>
        ))}
      </Grid>
      {props.data.length > 0 && (
        <div>
          {hasPreviousPage() && <PageButton onClick={onPreviousPage}>Previous</PageButton>}
          {props.page + 1}...{Math.floor(props.total / props.size) + 1}
          {hasNextPage() && <PageButton onClick={onNextPage}>Next</PageButton>}
        </div>
      )}
    </Container>
  );
}

export default NFTGrid;
