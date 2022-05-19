import { useState } from "react";
import { INFTProps, Skeleton } from "web3uikit";
import NFTBuyCard from "../NFTBuyCard/NFTBuyCard";
import { CardWrapper, Container, Grid, LoadingWrapper } from "./NFTGridStyled";

type NFTGridType = { data: INFTProps[]; size: number; isLoading?: boolean };

function NFTGrid(props: NFTGridType) {
  const [currentPage, setCurrentPage] = useState(0);

  const hasPreviousPage = () => {
    return currentPage > 0;
  };

  const hasNextPage = () => {
    return currentPage < Math.ceil(props.data.length / props.size) - 1;
  };

  const onPreviousPage = () => {
    if (!hasPreviousPage()) return;
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    if (!hasNextPage()) return;
    setCurrentPage(currentPage + 1);
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
        {props.data.slice(currentPage * props.size, currentPage * props.size + props.size).map((nft) => (
          <CardWrapper key={nft.tokenId}>
            <NFTBuyCard data={nft} />
          </CardWrapper>
        ))}
      </Grid>
      <div>
        {hasPreviousPage() && <button onClick={onPreviousPage}>previous</button>}
        {hasNextPage() && <button onClick={onNextPage}>next</button>}
      </div>
    </Container>
  );
}

export default NFTGrid;
