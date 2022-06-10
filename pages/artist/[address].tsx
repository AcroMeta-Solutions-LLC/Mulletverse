import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import StoreType from "../../types/StoreType";
import { Wrapper, Main, Title, LoadingWrapper } from "../../styles/ArtistStyled";

const Artist: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const address: string = Array.isArray(query.address) ? query.address[0] : query.address || "";
  const { data, isLoading, hasError, collection, owners } = useSelector((store: StoreType) => store.token);

  useEffect(() => {
    if (isInitialized) {
      // Moralis.Web3API.account.getNFTs({ address: creatorAddress })
    }
  }, [isInitialized]);

  const renderLoaderOrError = () => (
    <Main>
      <Wrapper>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && <LoadingWrapper>Loading...</LoadingWrapper>}
      </Wrapper>
    </Main>
  );

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <Title>Artist</Title>
        <span>{address}</span>
      </Wrapper>
    </Main>
  );
};

export default Artist;
