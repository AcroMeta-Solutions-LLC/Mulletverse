import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { clearStore, getFeaturedNFTs } from "../../config/marketplaceSlice";
import { AppDispatch } from "../../config/store";
import { Container, GridSection, Main, Section, Tab, TabRow, Title } from "../../styles/MarketplaceStyled";
import StoreType from "../../types/StoreType";

const Marketplace: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useRouter();
  const PAGE_SIZE = 20;
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError } = useSelector(
    (store: StoreType) => store.marketplace.featured,
  );

  useEffect(() => {
    if (isInitialized) dispatch(getFeaturedNFTs({ account: Moralis.Web3API.account, limit: PAGE_SIZE }));
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  const onPreviousPage = () => {
    dispatch(
      getFeaturedNFTs({
        account: Moralis.Web3API.account,
        limit: PAGE_SIZE,
        cursor: previousCursor[previousCursor.length - 2],
      }),
    );
  };

  const onNextPage = () => {
    dispatch(getFeaturedNFTs({ account: Moralis.Web3API.account, limit: PAGE_SIZE, cursor: nextCursor }));
  };

  return (
    <Main>
      <Container>
        <TabRow>
          <Link href="/marketplace">
            <Tab isActive={pathname === "/marketplace"}>Marketplace</Tab>
          </Link>
          <Link href="/marketplace/featured">
            <Tab isActive={pathname === "/marketplace/featured"}>Featured Artists</Tab>
          </Link>
          <Link href="/marketplace/minting">
            <Tab isActive={pathname === "/marketplace/minting"}>Minting Market</Tab>
          </Link>
        </TabRow>
        <Section>
          <Title>Featured Artists</Title>
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
        </Section>
      </Container>
    </Main>
  );
};

export default Marketplace;
