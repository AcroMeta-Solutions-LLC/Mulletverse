import { Illustration } from "web3uikit";
import { EmptyMessage, EmptyWrapper } from "./EmptyStateStyled";

type ErrorBannerPropType = { isEmpty: boolean; message?: string };

function EmptyState({ isEmpty, message }: ErrorBannerPropType) {
  return isEmpty ? (
    <EmptyWrapper>
      <Illustration logo="lazyNft" width={200} height={190} />
      <EmptyMessage>{message ? message : "Nothing here!"}</EmptyMessage>
    </EmptyWrapper>
  ) : (
    <></>
  );
}

export default EmptyState;
