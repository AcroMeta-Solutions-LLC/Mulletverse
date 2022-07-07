import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralis, useNewMoralisObject, useMoralisQuery } from "react-moralis";
import { AppDispatch } from "../../config/store";
import { useDispatch, useSelector } from "react-redux";
import StoreType from "../../types/StoreType";
import {
  clearStore,
  getCollectionData,
  getLikes,
  removeCollectionLike,
  saveCollectionLike,
} from "../../config/collectionSlice";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { Icon, Loading } from "web3uikit";
import { useTheme } from "styled-components";
import NFTGrid from "../../components/NFTGrid/NFTGrid";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaTwitter, FaDiscord, FaInstagram, FaTiktok, FaMedium } from "react-icons/fa";
import { IoThumbsUpSharp, IoThumbsUpOutline } from "react-icons/io5";
import {
  Main,
  Title,
  Wrapper,
  LoadingWrapper,
  ImageTitleRow,
  CollectionImage,
  Description,
  TitleDescription,
  TabRow,
  TabButton,
  CollectionData,
  Data,
  DataValue,
  DataLabel,
  RowWrapper,
  FilterArea,
  FilterWrapper,
  FilterTitle,
  FilterRow,
  FilterLabel,
  FilterCheckbox,
  FilterPriceRow,
  FilterSelect,
  FilterInput,
  FilterApply,
  FilterButton,
  FilterIconLabel,
  ActivityFilterRow,
  ChartContainer,
  ImageWrapper,
  SocialLinks,
  ImageContent,
  LikeNumber,
} from "../../styles/CollectionStyled";

type TabType = { id: number; label: string };
const tabs: TabType[] = [
  { id: 0, label: "Items" },
  { id: 1, label: "Activity" },
];

const Collection: NextPage = () => {
  const { isInitialized, user } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const PAGE_SIZE = 30;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const theme: any = useTheme();
  const { Web3API } = useMoralisWeb3Api();
  const { query } = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const address: string = Array.isArray(query.address) ? query.address[0] : query.address || "";
  const chain: any = Array.isArray(query.chain) ? query.chain[0] : query.chain || "";
  const { save: saveLike } = useNewMoralisObject("CollectionLikes");
  const { fetch: fetchLikes } = useMoralisQuery("CollectionLikes");
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError, name, likes, hasLike, isLoadingLikes } =
    useSelector((store: StoreType) => store.collection);

  useEffect(() => {
    if (isInitialized && address) {
      dispatch(getCollectionData({ address, token: Web3API.token, limit: PAGE_SIZE, chain }));
      dispatch(getLikes({ fetchLikes, owner: user?.get("ethAddress"), address }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Web3API, dispatch, chain, address, fetchLikes, user]);

  const onPreviousPage = () => {
    dispatch(
      getCollectionData({
        address,
        token: Web3API.token,
        limit: PAGE_SIZE,
        cursor: previousCursor[previousCursor.length - 2],
        chain,
      }),
    );
  };

  const onNextPage = () => {
    dispatch(getCollectionData({ address, token: Web3API.token, limit: PAGE_SIZE, cursor: nextCursor, chain }));
  };

  const renderLoaderOrError = () => (
    <Main>
      <Wrapper>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={theme.PRIMARY} />
          </LoadingWrapper>
        )}
      </Wrapper>
    </Main>
  );

  const likeOrDislike = () => {
    if (hasLike) {
      dispatch(removeCollectionLike({ fetchLikes, owner: user?.get("ethAddress") }));
    } else {
      dispatch(saveCollectionLike({ saveLike, owner: user?.get("ethAddress"), address }));
    }
  };

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <ImageTitleRow>
          <ImageWrapper>
            <CollectionImage style={{ backgroundImage: `url("/assets/logo.png")` }}>
              <ImageContent>
                <LikeNumber>{likes}</LikeNumber>
                {hasLike && !isLoadingLikes && (
                  <IoThumbsUpSharp size={20} color={theme.CARD} style={{ cursor: "pointer" }} onClick={likeOrDislike} />
                )}
                {!hasLike && !isLoadingLikes && (
                  <IoThumbsUpOutline
                    size={20}
                    color={theme.CARD}
                    style={{ cursor: "pointer" }}
                    onClick={likeOrDislike}
                  />
                )}
                {isLoadingLikes && <Loading spinnerColor={theme.CARD} />}
              </ImageContent>
            </CollectionImage>
            <SocialLinks>
              <FaTwitter size={20} />
              <FaDiscord size={20} />
              <FaInstagram size={20} />
              <FaTiktok size={20} />
              <FaMedium size={20} />
            </SocialLinks>
          </ImageWrapper>
          <TitleDescription>
            <div>
              <Title>{name}</Title>
              <Description>
                Meta Legends represent a collection of 12345 legends categorized by level of rarity and generated with
                hundreds of elements. The Legends are stored as ERC-721 tokens on the Ethereum blockchain and hosted on
                IPFS.
              </Description>
            </div>
            <CollectionData>
              <Data>
                <DataValue id="total">{total}</DataValue>
                <DataLabel htmlFor="total">Total</DataLabel>
              </Data>
              <Data>
                <DataValue id="owners">0</DataValue>
                <DataLabel htmlFor="owners">Owners</DataLabel>
              </Data>
              <Data>
                <DataValue id="floor-price">0</DataValue>
                <DataLabel htmlFor="floor-price">Floor Price</DataLabel>
              </Data>
              <Data>
                <DataValue id="total-volume">0</DataValue>
                <DataLabel htmlFor="total-volume">Total Volume</DataLabel>
              </Data>
            </CollectionData>
          </TitleDescription>
        </ImageTitleRow>
        <TabRow>
          <TabButton isActive={activeTab === tabs[0]} onClick={() => setActiveTab(tabs[0])}>
            {tabs[0].label}
          </TabButton>
          <TabButton isActive={activeTab === tabs[1]} onClick={() => setActiveTab(tabs[1])}>
            {tabs[1].label}
          </TabButton>
        </TabRow>
        {activeTab.id === tabs[0].id && (
          <Fragment>
            <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Icon size={28} svg="list" fill={theme.TITLE} />
              <FilterIconLabel>Filters</FilterIconLabel>
            </FilterButton>
            <RowWrapper>
              <FilterArea isFilterOpen={isFilterOpen}>
                {isFilterOpen && (
                  <FilterWrapper onSubmit={() => {}}>
                    <FilterTitle>Status</FilterTitle>
                    <FilterRow>
                      <FilterLabel>Buy now</FilterLabel>
                      <FilterCheckbox type="checkbox" />
                    </FilterRow>
                    <FilterRow>
                      <FilterLabel>On auction</FilterLabel>
                      <FilterCheckbox type="checkbox" />
                    </FilterRow>
                    <FilterTitle>Price</FilterTitle>
                    <FilterPriceRow>
                      <FilterSelect>
                        <option>USD</option>
                        <option>ETH</option>
                        <option>MATIC</option>
                        <option>BNB</option>
                      </FilterSelect>
                      <FilterInput type="text" placeholder="Min" />
                      <FilterLabel>to</FilterLabel>
                      <FilterInput type="text" placeholder="Max" />
                    </FilterPriceRow>
                    <FilterApply type="submit" value="Apply" />
                  </FilterWrapper>
                )}
              </FilterArea>
              <NFTGrid
                onNext={onNextPage}
                onPrevious={onPreviousPage}
                size={PAGE_SIZE}
                total={total}
                data={data.filter((nft) => nft.metadata).map((nft) => ({ ...nft, chain }))}
                isLoading={isLoading}
                page={page}
                cardWidth={isFilterOpen ? "324px" : "224px"}
              />
            </RowWrapper>
          </Fragment>
        )}
        {activeTab.id === tabs[1].id && (
          <Fragment>
            <ActivityFilterRow>
              <FilterButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <Icon size={28} svg="list" fill={theme.TITLE} />
                <FilterIconLabel>Filters</FilterIconLabel>
              </FilterButton>
              <FilterSelect>
                <option>Last 7 days</option>
                <option>Last 14 days</option>
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
                <option>All time</option>
              </FilterSelect>
            </ActivityFilterRow>
            <RowWrapper>
              <FilterArea isFilterOpen={isFilterOpen}>
                {isFilterOpen && (
                  <FilterWrapper onSubmit={() => {}}>
                    <FilterTitle>Event Type</FilterTitle>
                    <FilterRow>
                      <FilterLabel htmlFor="sales">Sales</FilterLabel>
                      <FilterCheckbox id="sales" type="checkbox" />
                    </FilterRow>
                    <FilterRow>
                      <FilterLabel htmlFor="listings">Listings</FilterLabel>
                      <FilterCheckbox id="listings" type="checkbox" />
                    </FilterRow>
                    <FilterRow>
                      <FilterLabel htmlFor="offers">Offers</FilterLabel>
                      <FilterCheckbox id="offers" type="checkbox" />
                    </FilterRow>
                    <FilterRow>
                      <FilterLabel htmlFor="collection_offers">Collection offers</FilterLabel>
                      <FilterCheckbox id="collection_offers" type="checkbox" />
                    </FilterRow>
                    <FilterRow>
                      <FilterLabel htmlFor="transfers">Transfers</FilterLabel>
                      <FilterCheckbox id="transfers" type="checkbox" />
                    </FilterRow>
                  </FilterWrapper>
                )}
              </FilterArea>
              <ChartContainer isFilterOpen={isFilterOpen}>
                <ResponsiveContainer>
                  <LineChart
                    data={[
                      { value: 0.4, name: "0" },
                      { value: 2.1, name: "2" },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </RowWrapper>
          </Fragment>
        )}
      </Wrapper>
    </Main>
  );
};

export default Collection;
