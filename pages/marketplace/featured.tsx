import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { getFeaturedNFTs } from "../../config/marketplaceSlice";
import { AppDispatch } from "../../config/store";
import { GridSection, Main, Section, Tab, TabRow, Title } from "../../styles/MarketplaceStyled";
import StoreType from "../../types/StoreType";

const Marketplace: NextPage = () => {
  const { isInitialized, Moralis } = useMoralis();
  const { featured, isFeaturedLoading } = useSelector((store: StoreType) => store.marketplace);
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useRouter();

  useEffect(() => {
    if (isInitialized) {
      dispatch(getFeaturedNFTs({ account: Moralis.Web3API.account }));
    }
  }, [isInitialized, Moralis.Web3API.account, dispatch]);

  return (
    <Main>
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
        <GridSection>
          <NFTGrid size={20} data={featured} isLoading={isFeaturedLoading} />
        </GridSection>
      </Section>
    </Main>
  );
};

export default Marketplace;
