import { Loading } from "web3uikit";
import NFTType from "../../types/NFTType";
import NFTCard from "../NFTCard/NFTCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CardWrapper, Container, Grid, LoadingWrapper, PageButton, PageNumber } from "./NFTGridStyled";
import COLORS from "../../constants/colors";
import { useSelector } from "react-redux";
import StoreType from "../../types/StoreType";
import { useRouter } from "next/router";

type NFTGridType = {
  data: NFTType[];
  size: number;
  isLoading?: boolean;
  onNext: Function;
  onPrevious: Function;
  total: number;
  page: number;
  align?: "center" | "flex-start";
  action?: "Buy" | "Sell";
  cardWidth?: string;
};

function NFTGrid(props: NFTGridType) {
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { push } = useRouter();

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

  const onSell = (data: NFTType) => {
    push({ pathname: `/listing/${data.address}`, query: { id: data.tokenId, chain: data.chain } });
  };

  const color = isDarkMode ? COLORS.GREY_200 : COLORS.GREY_300;

  return props.isLoading ? (
    <LoadingWrapper>
      <Loading spinnerColor={COLORS.PURPLE} />
    </LoadingWrapper>
  ) : (
    <Container align={props.align}>
      <Grid>
        {props.data.map((nft, i) => (
          <CardWrapper key={i}>
            <NFTCard width={props.cardWidth} data={nft} action={props.action} onSell={() => onSell(nft)} />
          </CardWrapper>
        ))}
      </Grid>
      {props.total > props.size && (
        <div>
          <PageButton onClick={hasPreviousPage() ? onPreviousPage : () => {}}>
            <FiChevronLeft color={hasPreviousPage() ? color : "transparent"} size={24} />
          </PageButton>
          <PageNumber>
            {props.page + 1}...{Math.floor(props.total / props.size) + 1}
          </PageNumber>
          <PageButton onClick={hasNextPage() ? onNextPage : () => {}}>
            <FiChevronRight color={hasNextPage() ? color : "transparent"} size={24} />
          </PageButton>
        </div>
      )}
    </Container>
  );
}

export default NFTGrid;
