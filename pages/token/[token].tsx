import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis, useNewMoralisObject, useMoralisQuery } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Loading, Tag, useNotification } from "web3uikit";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import {
  getTokenData,
  getCollection,
  removeTokenFromWishlist,
  saveTokenInWishlist,
  getOwners,
} from "../../config/tokenSlice";
import { getDisplayName } from "../../helpers/getDisplayName";
import { getImageURL } from "../../helpers/getTokenImage";
import { FiTag } from "react-icons/fi";
import { FaRegHeart, FaHeart, FaWallet } from "react-icons/fa";
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
} from "../../styles/TokenStyled";
import Link from "next/link";
import COLORS from "../../constants/colors";

const Token: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token: string = Array.isArray(query.token) ? query.token[0] : query.token || "";
  const tokenId: string = Array.isArray(query.id) ? query.id[0] : query.id || "";
  const chain: string = Array.isArray(query.chain) ? query.chain[0] : query.chain || "eth";
  const { data, isLoading, hasError, collection, owners } = useSelector((store: StoreType) => store.token);
  const { save: saveToWishlist } = useNewMoralisObject("Wishlist");
  const { fetch: getWishlist } = useMoralisQuery("Wishlist");
  const alert = useNotification();

  useEffect(() => {
    if (isInitialized && tokenId) {
      dispatch(getTokenData({ token: Moralis.Web3API.token, address: token, token_id: tokenId, chain, getWishlist }));
      // dispatch(getCollection({ token: Moralis.Web3API.token, address: token, chain }));
      dispatch(getOwners({ token: Moralis.Web3API.token, address: token, chain, token_id: tokenId }));
    }
  }, [Moralis, getWishlist, dispatch, isInitialized, token, tokenId, chain]);

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

  const toggleWishlist = () => {
    if (data.isInWishlist) {
      dispatch(removeTokenFromWishlist({ getWishlist }));
      alert({ type: "info", title: "Removed from the Wishlist", message: "", position: "topR" });
    } else {
      dispatch(saveTokenInWishlist({ saveToWishlist }));
      alert({ type: "info", title: "Added to the Wishlist", message: "", position: "topR" });
    }
  };

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <Container>
          <LeftColumn>
            <a rel="noopener noreferrer" target="_blank" href={getImageURL(data.metadata?.image)}>
              <TokenImage src={getImageURL(data.metadata?.image)} />
            </a>
            <ButtonOutline onClick={toggleWishlist}>
              {data.isInWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              <span>{data.isInWishlist ? "On the Wishlist" : "Add to Wishlist"}</span>
            </ButtonOutline>
          </LeftColumn>
          <RightColumn>
            <TitleWrapper>
              <Title>{data.metadata.name}</Title>
              <TokenHeader>
                <span>{getDisplayName(token)}</span>
                <Icon size={20} svg={chain as any} />
              </TokenHeader>
            </TitleWrapper>
            <span>
              <OwnedByLabel>Owned by: </OwnedByLabel>
              <Link href={`/artist/${data.owner_of}`}>
                <OwnedBy>{data.owner_of === user?.get("ethAddress") ? "You" : getDisplayName(data.owner_of)}</OwnedBy>
              </Link>
            </span>
            <ButtonRow>
              <Button>
                <FaWallet size={24} />
                <span>Buy now</span>
              </Button>
              <ButtonOutline>
                <FiTag size={24} />
                <span>Make offer</span>
              </ButtonOutline>
            </ButtonRow>
            <Collapsable isOpen={!!data.metadata?.description} title="Description">
              {data.metadata.description}
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
        <Collapsable isOpen={collection.data.length > 0} title="More from Collection">
          <Carousel size={collection.data.length} isLoading={collection.isLoading}>
            {collection.data.map((nft) => (
              <NFTCard data={nft} key={nft.tokenId} />
            ))}
          </Carousel>
        </Collapsable>
        {owners.length > 0 && (
          <Link href={`/artist/${owners[owners.length - 1].owner_of}`}>
            <SeeMoreButton>See More</SeeMoreButton>
          </Link>
        )}
      </Wrapper>
    </Main>
  );
};

export default Token;
