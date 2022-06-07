import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useMoralis, useNewMoralisObject, useMoralisQuery } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Skeleton, Tag } from "web3uikit";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import { getTokenData, removeTokenFromWishlist, saveTokenInWishlist } from "../../config/tokenSlice";
import { getDisplayName } from "../../helpers/getDisplayName";
import { getImageURL } from "../../helpers/getTokenImage";
import { FiClipboard, FiCreditCard } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
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
  SkeletonColumn,
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
} from "../../styles/TokenStyled";

const Token: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token: string = Array.isArray(query.token) ? query.token[0] : query.token || "";
  const tokenId: string = Array.isArray(query.id) ? query.id[0] : query.id || "";
  const chain: string = Array.isArray(query.chain) ? query.chain[0] : query.chain || "eth";
  const { data, isLoading, hasError, collection } = useSelector((store: StoreType) => store.token);
  const { save: saveToWishlist } = useNewMoralisObject("Wishlist");
  const { fetch: getWishlist } = useMoralisQuery("Wishlist");

  useEffect(() => {
    if (isInitialized && tokenId) {
      dispatch(getTokenData({ token: Moralis.Web3API.token, address: token, token_id: tokenId, chain, getWishlist }));
    }
  }, [Moralis, getWishlist, dispatch, isInitialized, token, tokenId, chain]);

  const renderLoaderOrError = () => (
    <Main>
      <Wrapper>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Skeleton theme="image" width="300px" height="430px" />
            <SkeletonColumn>
              <Skeleton theme="text" width="400px" />
              <Skeleton theme="subtitle" width="300px" />
            </SkeletonColumn>
          </LoadingWrapper>
        )}
      </Wrapper>
    </Main>
  );

  const toggleWishlist = () => {
    if (data.isInWishlist) {
      dispatch(removeTokenFromWishlist({ getWishlist }));
    } else {
      dispatch(saveTokenInWishlist({ saveToWishlist }));
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
            <Title>{data.metadata.name}</Title>
            <TokenHeader>
              <Subtitle>{getDisplayName(token)}</Subtitle>
              <Icon size={24} svg={chain as any} />
            </TokenHeader>
            <OwnedBy>
              Owned by: {data.owner_of === user?.get("ethAddress") ? "You" : getDisplayName(data.owner_of)}
            </OwnedBy>
            <ButtonRow>
              <Button>
                <FiCreditCard size={24} />
                <span>Buy now</span>
              </Button>
              <ButtonOutline>
                <FiClipboard size={24} />
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
        <Collapsable isOpen={collection.length > 0} title="More from Collection">
          <Carousel size={collection.length}>
            {collection.map((nft) => (
              <NFTCard data={nft} key={nft.tokenId} />
            ))}
          </Carousel>
        </Collapsable>
        <SeeMoreButton>See More</SeeMoreButton>
      </Wrapper>
    </Main>
  );
};

export default Token;
