import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { CopyButton, Loading, Select, Tag } from "web3uikit";
import Dashboard from "../../components/Dashboard/Dashboard";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import {
  clearStore,
  getCollectionNFTs,
  setProfileChain,
} from "../../config/profileSlice";
import { AppDispatch } from "../../config/store";
import { CHAINS } from "../../constants/chains";
import COLORS from "../../constants/colors";
import { getDisplayName } from "../../helpers/getDisplayName";
import {
  CollectionsTab,
  Controls,
  Description,
  Interests,
  LoadingWrapper,
  Main,
  ProfileImage,
  TabButton,
  TabRow,
  Title,
  TitleSection,
  TitleWrapper,
  Wrapper,
} from "../../styles/ProfileStyled";
import { ChainType } from "../../types/ChainType";
import StoreType from "../../types/StoreType";

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
];

type TabType = { id: number; label: string };

const Artist: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const address: string = Array.isArray(query.address)
    ? query.address[0]
    : query.address || "";
  const {
    collection,
    isLoading,
    hasError,
    chain,
    bio,
    imageUrl,
    username,
    interests,
  } = useSelector((store: StoreType) => store.profile);

  const [sortOrder, setSortOrder] = useState(sortOptions[0].id);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const collectionLimit = 100;

  useEffect(() => {
    if (isInitialized && address) {
      dispatch(
        getCollectionNFTs({
          account: Moralis.Web3API.account,
          chain,
          address,
          limit: collectionLimit,
        })
      );
      // dispatch(getProfile(address));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Moralis, dispatch, address, chain]);

  const onPreviousCollectionPage = () => {
    const cursor =
      collection.previousCursor[collection.previousCursor.length - 2];
    const limit = collectionLimit;
    dispatch(
      getCollectionNFTs({
        account: Moralis.Web3API.account,
        chain,
        address,
        limit,
        cursor,
      })
    );
  };

  const onNextCollectionPage = () => {
    const cursor = collection.nextCursor;
    const limit = collectionLimit;
    dispatch(
      getCollectionNFTs({
        account: Moralis.Web3API.account,
        chain,
        address,
        limit,
        cursor,
      })
    );
  };

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

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <TitleSection>
          <ProfileImage
            style={{
              backgroundImage: `url(${imageUrl || "/assets/major-mullet.png"})`,
            }}
          />
          <TitleWrapper>
            {username && <Title>{username}</Title>}
            <Description>
              {getDisplayName(user?.get("ethAddress"))}
              <CopyButton
                onCopy={(e) => e?.preventDefault()}
                text={user?.get("ethAddress")}
              />
            </Description>
            <Description>{bio}</Description>
            <Interests>
              {interests?.map((interest) => (
                <Tag key={interest.id} hasCancel={false} text={interest.name} />
              ))}
            </Interests>
          </TitleWrapper>
        </TitleSection>
        <TabRow>
          <TabButton
            isActive={activeTab === tabs[0]}
            onClick={() => setActiveTab(tabs[0])}
          >
            {tabs[0].label}
          </TabButton>
          <TabButton
            isActive={activeTab === tabs[1]}
            onClick={() => setActiveTab(tabs[1])}
          >
            {tabs[1].label}
          </TabButton>
        </TabRow>
        <section>
          {activeTab.id === tabs[0].id && <Dashboard />}
          {activeTab.id === tabs[1].id && (
            <CollectionsTab>
              <Controls>
                <Select
                  defaultOptionIndex={0}
                  onChange={({ id }) =>
                    dispatch(setProfileChain(id as ChainType))
                  }
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
                isEmpty={
                  collection.data.filter((nft) => nft.metadata).length === 0 &&
                  !hasError &&
                  !isLoading
                }
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
        </section>
      </Wrapper>
    </Main>
  );
};

export default Artist;
