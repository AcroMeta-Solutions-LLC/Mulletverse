import { Illustration } from "web3uikit";
import { ErrorMessage, ErrorWrapper } from "./ErrorBannerStyled";

type ErrorBannerPropType = { hasError: boolean };

function ErrorBanner({ hasError }: ErrorBannerPropType) {
  return hasError ? (
    <ErrorWrapper>
      <Illustration logo="comingSoon" width={200} height={190} />
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
    </ErrorWrapper>
  ) : (
    <></>
  );
}

export default ErrorBanner;
