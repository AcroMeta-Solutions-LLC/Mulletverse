import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Skeleton } from "web3uikit";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import { clearStore, getTokenData } from "../../config/tokenSlice";
import { getImageURL } from "../../helpers/getTokenImage";
import { Section, Main, Title, LoadingWrapper, SkeletonColumn, Container, TokenImage } from "../../styles/TokenStyled";
import StoreType from "../../types/StoreType";

const Token: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token: string = Array.isArray(query.token) ? query.token[0] : query.token || "";
  const tokenId: string = Array.isArray(query.id) ? query.id[0] : query.id || "";
  const { data, isLoading, hasError } = useSelector((store: StoreType) => store.token);

  useEffect(() => {
    if (isInitialized && tokenId)
      dispatch(getTokenData({ token: Moralis.Web3API.token, address: token, token_id: tokenId }));
    return () => {
      dispatch(clearStore());
    };
  }, [Moralis.Web3API.token, dispatch, isInitialized, token, tokenId]);

  return (
    <Main>
      <Section>
        <Title>Token</Title>
        <ErrorBanner hasError={hasError} />
        <Container>{data.metadata?.image && <TokenImage src={getImageURL(data.metadata.image)} />}</Container>
        {isLoading && (
          <LoadingWrapper>
            <Skeleton theme="image" width="300px" height="400px" />
            <SkeletonColumn>
              <Skeleton theme="text" width="300px" />
              <Skeleton theme="subtitle" width="300px" />
            </SkeletonColumn>
          </LoadingWrapper>
        )}
      </Section>
    </Main>
  );
};

export default Token;
