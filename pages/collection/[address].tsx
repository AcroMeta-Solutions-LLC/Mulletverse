import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
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
} from "../../styles/CollectionStyled";
import { AppDispatch } from "../../config/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StoreType from "../../types/StoreType";
import { clearStore, getCollectionNFTs } from "../../config/collectionSlice";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { Loading } from "web3uikit";
import { useTheme } from "styled-components";
import NFTGrid from "../../components/NFTGrid/NFTGrid";

type TabType = { id: number; label: string };
const tabs: TabType[] = [
  { id: 0, label: "Items" },
  { id: 1, label: "Activity" },
];

const Collection: NextPage = () => {
  const { isInitialized } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  const PAGE_SIZE = 30;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const theme: any = useTheme();
  const { Web3API } = useMoralisWeb3Api();
  const { query } = useRouter();
  const address: string = Array.isArray(query.address) ? query.address[0] : query.address || "";
  const chain: any = Array.isArray(query.chain) ? query.chain[0] : query.chain || "";
  const { data, isLoading, total, nextCursor, previousCursor, page, hasError, name } = useSelector(
    (store: StoreType) => store.collection,
  );

  useEffect(() => {
    if (isInitialized && address) {
      dispatch(getCollectionNFTs({ address, token: Web3API.token, limit: PAGE_SIZE, chain }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, Web3API, dispatch, chain, address]);

  const onPreviousPage = () => {
    dispatch(
      getCollectionNFTs({
        address,
        token: Web3API.token,
        limit: PAGE_SIZE,
        cursor: previousCursor[previousCursor.length - 2],
        chain,
      }),
    );
  };

  const onNextPage = () => {
    dispatch(getCollectionNFTs({ address, token: Web3API.token, limit: PAGE_SIZE, cursor: nextCursor, chain }));
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

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <ImageTitleRow>
          <CollectionImage style={{ backgroundImage: `url("/assets/logo.png")` }} />
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
          <NFTGrid
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            size={PAGE_SIZE}
            total={total}
            data={data.filter((nft) => nft.metadata).map((nft) => ({ ...nft, chain }))}
            isLoading={isLoading}
            page={page}
            cardWidth="224px"
          />
        )}
      </Wrapper>
    </Main>
  );
};

export default Collection;
