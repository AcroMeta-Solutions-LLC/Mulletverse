import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useMoralis, useNewMoralisObject, useMoralisQuery } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Loading, Tag, useNotification, CopyButton } from "web3uikit";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import { getTokenData, removeTokenFromWishlist, saveTokenInWishlist, getCollection } from "../../config/tokenSlice";
import { getDisplayName } from "../../helpers/getDisplayName";
import { getImageURL } from "../../helpers/getTokenImage";
import { FiTag } from "react-icons/fi";
import { FaRegHeart, FaHeart, FaWallet } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import StoreType from "../../types/StoreType";
import Collapsable from "../../components/Collapsable/Collapsable";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Carousel from "../../components/Carousel/Carousel";
import NFTCard from "../../components/NFTCard/NFTCard";
import { parseDatetime } from "../../helpers/parseDatetime";
import { getEthValue } from "../../helpers/getEthValue";
import {
  Wrapper,
  Main,
  Title,
  LoadingWrapper,
  Container,
  TokenImage,
  LeftColumn,
  RightColumn,
  Button,
  ButtonRow,
  ButtonOutline,
  Subtitle,
  Detail,
  DetailLabel,
  DetailInfo,
  ChartContainer,
  InfoContainer,
  OwnedBy,
  Table,
  TokenHeader,
  SeeMoreButton,
  TitleWrapper,
  OwnedByLabel,
  GlassOverlay,
  ZoomedImage,
} from "../../styles/TokenStyled";
import Link from "next/link";
import { getCryptoIconName } from "../../helpers/getCryptoIcon";
import { useTheme } from "styled-components";
import { useProgressiveImage } from "../../hooks/useProgressiveImage";

const Token: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query, push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token: string = Array.isArray(query.token) ? query.token[0] : query.token || "";
  const tokenId: string = Array.isArray(query.id) ? query.id[0] : query.id || "";
  const chain: string = Array.isArray(query.chain) ? query.chain[0] : query.chain || "eth";
  const { data, isLoading, hasError, collection } = useSelector((store: StoreType) => store.token);
  const { save: saveToWishlist } = useNewMoralisObject("Wishlist");
  const { fetch: getWishlist } = useMoralisQuery("Wishlist");
  const alert = useNotification();
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const theme: any = useTheme();
  const isUserOwner: boolean = useMemo(() => data.owner_of === user?.get("ethAddress"), [data, user]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const imageLoaded = useProgressiveImage(getImageURL(data.metadata?.image));

  useEffect(() => {
    if (isInitialized && tokenId) {
      dispatch(getTokenData({ token: Moralis.Web3API.token, address: token, token_id: tokenId, chain, getWishlist }));
      dispatch(getCollection({ token: Moralis.Web3API.token, address: token, chain }));
    }
  }, [Moralis, getWishlist, dispatch, isInitialized, token, tokenId, chain]);

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

  const toggleWishlist = () => {
    if (data.isInWishlist) {
      dispatch(removeTokenFromWishlist({ getWishlist }));
      alert({ type: "info", title: "Removed from the Wishlist", message: "", position: "topR" });
    } else {
      dispatch(saveTokenInWishlist({ saveToWishlist }));
      alert({ type: "info", title: "Added to the Wishlist", message: "", position: "topR" });
    }
  };

  const buyNFT = async (): Promise<void> => {
    if (isBuyLoading) return;
    setIsBuyLoading(true);
    try {
      await Moralis.enableWeb3();
      await Moralis.Plugins.opensea.createBuyOrder({
        network: "mainnet",
        tokenAddress: token,
        tokenId: tokenId,
        tokenType: "ERC20",
        amount: 1,
        userAddress: user?.get("ethAddress"),
        paymentTokenAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
      });
    } catch (error: any) {
      alert({
        type: "error",
        title: error.name,
        message: "An error occurred when trying to create the Buy Order",
        position: "topR",
      });
      console.log(error);
    } finally {
      setIsBuyLoading(false);
    }
  };

  const refreshMetadata = async (): Promise<void> => {
    try {
      await Moralis.Web3API.token.reSyncMetadata({
        address: token,
        token_id: tokenId,
        flag: "metadata",
      });
      alert({ type: "info", title: "Refreshing Metadata...", message: "", position: "topR" });
    } catch (error) {
      alert({
        type: "error",
        title: "Error",
        message: "An error occurred when updating the Metadata.",
        position: "topR",
      });
      console.error(error);
    }
  };

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Fragment>
      <Main>
        <Wrapper>
          <Container>
            <LeftColumn>
              <TokenImage src={imageLoaded} onClick={() => setIsOverlayOpen(true)}>
                {!imageLoaded && <Loading spinnerColor={theme.PRIMARY} />}
              </TokenImage>
              <ButtonOutline onClick={toggleWishlist}>
                {data.isInWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                <span>{data.isInWishlist ? "On the Wishlist" : "Add to Wishlist"}</span>
              </ButtonOutline>
            </LeftColumn>
            <RightColumn>
              <TitleWrapper>
                <Title>{data.metadata?.name}</Title>
                <TokenHeader>
                  <Icon size={20} svg={getCryptoIconName(chain || "") as any} />
                  <span>{getDisplayName(token)}</span>
                  <CopyButton onCopy={(e) => e?.preventDefault()} text={token} />
                </TokenHeader>
                <FiRefreshCcw style={{ cursor: "pointer" }} size={24} color={theme.TITLE} onClick={refreshMetadata} />
              </TitleWrapper>
              <span>
                <OwnedByLabel>Owned by: </OwnedByLabel>
                <Link href={`/profile/${data.owner_of}`}>
                  <OwnedBy>{isUserOwner ? "You" : getDisplayName(data.owner_of)}</OwnedBy>
                </Link>
              </span>
              {!isUserOwner && (
                <ButtonRow>
                  <Button onClick={buyNFT}>
                    {!isBuyLoading && (
                      <Fragment>
                        <FaWallet size={24} />
                        <span>Buy now</span>
                      </Fragment>
                    )}
                    {isBuyLoading && <Loading spinnerColor={theme.CARD} />}
                  </Button>
                  <ButtonOutline>
                    <FiTag size={24} />
                    <span>Make offer</span>
                  </ButtonOutline>
                </ButtonRow>
              )}
              {isUserOwner && (
                <ButtonRow>
                  <Button onClick={() => push({ pathname: `/listing/${token}`, query: { id: tokenId, chain } })}>
                    <FaWallet size={24} />
                    <span>Sell</span>
                  </Button>
                  <ButtonOutline>
                    <span>Transfer</span>
                  </ButtonOutline>
                </ButtonRow>
              )}
              <Collapsable isOpen={!!data.metadata?.description} title="Description">
                {data.metadata?.description}
              </Collapsable>
              <Collapsable title={`Attributes (${data.metadata?.attributes ? data.metadata?.attributes.length : 0})`}>
                {data.metadata?.attributes?.map((attr, i) => (
                  <Tag key={i} color="purple" text={`${attr.trait_type}: ${attr.value}`} />
                ))}
              </Collapsable>
              <Collapsable title="Details">
                <Detail>
                  <DetailLabel>Address</DetailLabel>
                  <DetailInfo>{data.token_address}</DetailInfo>
                </Detail>
                <Detail>
                  <DetailLabel>Token ID</DetailLabel>
                  <DetailInfo>{data.token_id}</DetailInfo>
                </Detail>
                <Detail>
                  <DetailLabel>Contract</DetailLabel>
                  <DetailInfo>{data.contract_type}</DetailInfo>
                </Detail>
                <Detail>
                  <DetailLabel>Owner</DetailLabel>
                  <DetailInfo>{data.owner_of}</DetailInfo>
                </Detail>
              </Collapsable>
            </RightColumn>
          </Container>
          <ChartContainer>
            <Subtitle>Price History</Subtitle>
            <ResponsiveContainer>
              <LineChart width={500} height={300} data={data.transfers?.map((t) => ({ price: getEthValue(t.value) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="price" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <InfoContainer>
            <Collapsable isOpen title="Offers">
              <Table>
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2,85 ETH</td>
                    <td>0xbc59</td>
                  </tr>
                </tbody>
              </Table>
            </Collapsable>
            <Collapsable isOpen title="Item Activity">
              <Table>
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transfers?.map((transfer, i) => (
                    <tr key={i}>
                      <td>{getEthValue(transfer.value)}</td>
                      <td>{getDisplayName(transfer.from_address)}</td>
                      <td>{getDisplayName(transfer.to_address)}</td>
                      <td>{parseDatetime(transfer.block_timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Collapsable>
          </InfoContainer>
          <Collapsable isOpen={true} title="More from Collection">
            <Carousel size={collection.data.length} isLoading={collection.isLoading}>
              {collection.data.map((nft) => (
                <NFTCard data={nft} key={nft.tokenId} />
              ))}
            </Carousel>
          </Collapsable>
          <Link href={`/collection/${token}?chain=${chain}`}>
            <SeeMoreButton>See More</SeeMoreButton>
          </Link>
        </Wrapper>
      </Main>
      <GlassOverlay onClick={() => setIsOverlayOpen(false)} isVisible={isOverlayOpen}>
        <ZoomedImage alt="zoomed-in-image" src={getImageURL(data.metadata?.image)} />
      </GlassOverlay>
    </Fragment>
  );
};

export default Token;
