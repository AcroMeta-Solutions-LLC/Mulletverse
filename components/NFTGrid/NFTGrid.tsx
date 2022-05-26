import { Skeleton } from "web3uikit";
import NFTType from "../../types/NFTType";
import NFTCard from "../NFTCard/NFTCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CardWrapper, Container, Grid, LoadingWrapper, PageButton } from "./NFTGridStyled";
import COLORS from "../../constants/colors";

type NFTGridType = {
  data: NFTType[];
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
            <NFTCard data={nft} />
          </CardWrapper>
        ))}
      </Grid>
      {props.data.length > 0 && (
        <div>
          <PageButton onClick={hasPreviousPage() ? onPreviousPage : () => {}}>
            <FiChevronLeft color={hasPreviousPage() ? COLORS.DARK : COLORS.GREY} size={24} />
          </PageButton>
          {props.page + 1}...{Math.floor(props.total / props.size) + 1}
          <PageButton onClick={hasNextPage() ? onNextPage : () => {}}>
            <FiChevronRight color={hasNextPage() ? COLORS.DARK : COLORS.GREY} size={24} />
          </PageButton>
        </div>
      )}
    </Container>
  );
}

export default NFTGrid;
