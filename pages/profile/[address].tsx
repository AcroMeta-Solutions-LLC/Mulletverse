import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import StoreType from "../../types/StoreType";
import { getDisplayName } from "../../helpers/getDisplayName";
import { Loading, Select } from "web3uikit";
import { Collections } from "../../helpers/mocks";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import { clearStore, getCollectionNFTs, getProfile, setProfileChain } from "../../config/profileSlice";
import COLORS from "../../constants/colors";
import { CHAINS } from "../../constants/chains";
import { ChainType } from "../../types/ChainType";
import EmptyState from "../../components/EmptyState/EmptyState";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import Dashboard from "../../components/Dashboard/Dashboard";
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
  CreatedTabContent,
} from "../../styles/ProfileStyled";

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

type TabType = { id: number; label: string };

const Artist: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const address: string = Array.isArray(query.address) ? query.address[0] : query.address || "";
  const { collection, isLoading, hasError, chain, bio, email, imageUrl, username } = useSelector(
    (store: StoreType) => store.profile,
  );
  const [sortOrder, setSortOrder] = useState(sortOptions[0].id);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const collectionLimit = 100;

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
      dispatch(getCollectionNFTs({ account: Moralis.Web3API.account, chain, address, limit: collectionLimit }));
      dispatch(getProfile(address));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis, dispatch, address, chain]);

  const onPreviousCollectionPage = () => {
    const cursor = collection.previousCursor[collection.previousCursor.length - 2];
    const limit = collectionLimit;
    dispatch(getCollectionNFTs({ account: Moralis.Web3API.account, chain, address, limit, cursor }));
  };

  const onNextCollectionPage = () => {
    const cursor = collection.nextCursor;
    const limit = collectionLimit;
    dispatch(getCollectionNFTs({ account: Moralis.Web3API.account, chain, address, limit, cursor }));
  };

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <TitleSection>
          <ProfileImage style={{ backgroundImage: `url(${imageUrl || "/assets/major-mullet.png"})` }} />
          <TitleWrapper>
            <Title>{username || getDisplayName(address)}</Title>
            <Description>{email}</Description>
            <Description>{bio}</Description>
          </TitleWrapper>
        </TitleSection>
        <TabRow>
          <TabButton isActive={activeTab === tabs[0]} onClick={() => setActiveTab(tabs[0])}>
            {tabs[0].label}
          </TabButton>
          <TabButton isActive={activeTab === tabs[1]} onClick={() => setActiveTab(tabs[1])}>
            {tabs[1].label}
          </TabButton>
          <TabButton isActive={activeTab === tabs[2]} onClick={() => setActiveTab(tabs[2])}>
            {tabs[2].label}
          </TabButton>
        </TabRow>
        <section>
          {activeTab.id === tabs[0].id && <Dashboard address={address} />}
          {activeTab.id === tabs[1].id && (
            <CollectionsTab>
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
              <EmptyState
                isEmpty={collection.data.filter((nft) => nft.metadata).length === 0 && !hasError && !isLoading}
              />
              <NFTGrid
                onNext={onNextCollectionPage}
                onPrevious={onPreviousCollectionPage}
                size={100}
                total={collection.total}
                data={collection.data.filter((nft) => nft.metadata)}
                isLoading={collection.isLoading}
                page={collection.page}
                align="flex-start"
                action={address === user?.get("ethAddress") ? "Sell" : "Buy"}
              />
            </CollectionsTab>
          )}
          {activeTab.id === tabs[2].id && (
            <CreatedTabContent>
              {Collections.map((collection, i) => (
                <CollectionCard width="465px" key={i} collection={collection} />
              ))}
            </CreatedTabContent>
          )}
        </section>
      </Wrapper>
    </Main>
  );
};

export default Artist;
