import { Illustration } from "web3uikit";
import { EmptyMessage, EmptyWrapper } from "./EmptyStateStyled";

type ErrorBannerPropType = { isEmpty: boolean };

function EmptyState({ isEmpty }: ErrorBannerPropType) {
  return isEmpty ? (
    <EmptyMessage>
      <Illustration logo="lazyNft" width={200} height={190} />
      <EmptyWrapper>Nothing here!</EmptyWrapper>
    </EmptyMessage>
  ) : (
    <></>
  );
}

export default EmptyState;
