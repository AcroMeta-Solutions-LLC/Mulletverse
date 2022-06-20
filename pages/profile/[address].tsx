import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import StoreType from "../../types/StoreType";
import { getDisplayName } from "../../helpers/getDisplayName";
import {
  Wrapper,
  Main,
  Title,
  LoadingWrapper,
  TabRow,
  TabButton,
  Controls,
  Description,
  ProfileImage,
  TitleWrapper,
  TitleSection,
  CollectionsTab,
  CreatedTab,
  CreatedTabContent,
} from "../../styles/ProfileStyled";
import { Loading, Select } from "web3uikit";
import { Collections } from "../../helpers/mocks";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import { clearStore, getCreatedNFT, setProfileChain } from "../../config/profileSlice";
import NFTCard from "../../components/NFTCard/NFTCard";
import COLORS from "../../constants/colors";
import { CHAINS } from "../../constants/chains";
import { ChainType } from "../../types/ChainType";
import EmptyState from "../../components/EmptyState/EmptyState";

type TabType = { id: number; label: string };

const Artist: NextPage = () => {
  const sortOptions = [
    { id: "recentlyAdded", label: "Recently Added" },
    { id: "popular", label: "Popular" },
    { id: "soldOut", label: "Sold Out" },
    { id: "lowToHigh", label: "Low to high Floor Price" },
    { id: "HighToLow", label: "High to low Floor Price" },
  ];
  const tabs: TabType[] = [
    { id: 0, label: "NFT Portfolio" },
    { id: 1, label: "Collection" },
    { id: 2, label: "Created" },
  ];

  const { isInitialized, Moralis } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const address: string = Array.isArray(query.address) ? query.address[0] : query.address || "";
  const { collection, isLoading, hasError, createdNFT, chain } = useSelector((store: StoreType) => store.profile);
  const [sortOrder, setSortOrder] = useState(sortOptions[0].id);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderLoaderOrError = () => (
    <Main>
      <Wrapper>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={COLORS.PURPLE} />
          </LoadingWrapper>
        )}
      </Wrapper>
    </Main>
  );

  useEffect(() => {
    if (isInitialized && address) {
      dispatch(getCreatedNFT({ account: Moralis.Web3API.account, chain, address }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis, dispatch, address, chain]);

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <TitleSection>
          <ProfileImage />
          <TitleWrapper>
            <Title>{getDisplayName(address)}</Title>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pellentesque mollis sem, a aliquet eros
              tempus vitae. Proin odio justo, pulvinar non congue ut, pretium bibendum purus. Ut vel neque ex. Nam
              egestas nibh in nisl faucibus vehicula.
            </Description>
          </TitleWrapper>
        </TitleSection>
        <TabRow>
          <TabButton onClick={() => setActiveTab(tabs[0])}>{tabs[0].label}</TabButton>
          <TabButton onClick={() => setActiveTab(tabs[1])}>{tabs[1].label}</TabButton>
          <TabButton onClick={() => setActiveTab(tabs[2])}>{tabs[2].label}</TabButton>
        </TabRow>
        <section>
          {activeTab.id === tabs[0].id && (
            <CreatedTab>
              <Controls>
                <Select
                  defaultOptionIndex={0}
                  onChange={({ id }) => dispatch(setProfileChain(id as ChainType))}
                  options={CHAINS}
                  prefixText="Chain:"
                  value={chain}
                />
                <Select
                  defaultOptionIndex={0}
                  onChange={({ id }) => setSortOrder(id as string)}
                  options={sortOptions}
                  prefixText="Sort by:&nbsp;"
                  value={sortOrder}
                  width="300px"
                />
              </Controls>
              <EmptyState isEmpty={createdNFT.filter((nft) => nft.metadata).length === 0 && !hasError && !isLoading} />
              <CreatedTabContent>
                {createdNFT
                  .filter((nft) => nft.metadata)
                  .map((nft, i) => (
                    <NFTCard key={i} data={nft} width="300px" />
                  ))}
              </CreatedTabContent>
            </CreatedTab>
          )}
          {activeTab.id === tabs[1].id && (
            <CollectionsTab>
              {Collections.map((collection, i) => (
                <CollectionCard width="465px" key={i} collection={collection} />
              ))}
            </CollectionsTab>
          )}
          {activeTab.id === tabs[2].id && <div>{tabs[2].label}</div>}
        </section>
      </Wrapper>
    </Main>
  );
};

export default Artist;
