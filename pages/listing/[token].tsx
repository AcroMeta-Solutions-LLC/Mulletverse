import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Loading, CopyButton, Modal, useNotification } from "web3uikit";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner";
import { AppDispatch } from "../../config/store";
import { getTokenData } from "../../config/listingSlice";
import { getDisplayName } from "../../helpers/getDisplayName";
import { getImageURL } from "../../helpers/getTokenImage";
import StoreType from "../../types/StoreType";
import COLORS from "../../constants/colors";
import { getCryptoIconName } from "../../helpers/getCryptoIcon";
import { FaRegCalendar, FaDollarSign, FaClock } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range } from "react-date-range";
import {
  Wrapper,
  Main,
  Title,
  LoadingWrapper,
  Container,
  TokenImage,
  LeftColumn,
  RightColumn,
  TokenHeader,
  TitleWrapper,
  ImageData,
  ImageDataWrapper,
  Strong,
  Label,
  TypeButton,
  TypeWrapper,
  Subtitle,
  Select,
  PriceRow,
  Input,
  CalendarSelect,
  Divider,
  FeeRow,
  Fee,
  CompleteButton,
} from "../../styles/ListingStyled";
import { parseDate } from "../../helpers/parseDatetime";
import { useTheme } from "styled-components";
import { ethers } from "ethers";

const Listing: NextPage = () => {
  const { isInitialized, Moralis, user } = useMoralis();
  const { query } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const token: string = Array.isArray(query.token) ? query.token[0] : query.token || "";
  const tokenId: string = Array.isArray(query.id) ? query.id[0] : query.id || "";
  const chain: string = Array.isArray(query.chain) ? query.chain[0] : query.chain || "eth";
  const { data, isLoading, hasError } = useSelector((store: StoreType) => store.listing);
  const isUserOwner: boolean = useMemo(() => data.owner_of === user?.get("ethAddress"), [data, user]);
  const TYPES = ["FIXED_PRICE", "TIMED AUCTION"];
  const [type, setType] = useState(TYPES[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme: any = useTheme();
  const [amount, setAmount] = useState(0);
  const alert = useNotification();
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  useEffect(() => {
    Moralis.enableWeb3();
  }, [Moralis]);

  useEffect(() => {
    if (isInitialized && tokenId) {
      dispatch(getTokenData({ token: Moralis.Web3API.token, address: token, token_id: tokenId, chain }));
    }
  }, [Moralis, dispatch, isInitialized, token, tokenId, chain]);

  const renderLoaderOrError = () => (
    <Main>
      <Wrapper>
        {(hasError || !isUserOwner) && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={COLORS.PURPLE} />
          </LoadingWrapper>
        )}
      </Wrapper>
    </Main>
  );

  const completeListing = async () => {
    if (!isInitialized || !user || isLoading || amount <= 0) return;
    const takeValue = ethers.utils.parseEther(amount.toString()).toString();
    try {
      await Moralis.Plugins.rarible.createSellOrder({
        chain: "eth",
        userAddress: user?.get("ethAddress"),
        makeTokenId: tokenId,
        makeTokenAddress: token,
        makeAssetClass: "ERC1155",
        makeValue: "1",
        takeAssetClass: "ETH",
        takeValue,
      });
      alert({ type: "success", title: "NFT Created!", message: "Opening new tab...", position: "topR" });
    } catch (error: any) {
      alert({
        type: "error",
        title: error.name,
        message: "An error occurred when trying to create the Sell Order",
        position: "topR",
      });
      console.log(error.message);
    }
  };

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Wrapper>
        <Container>
          <LeftColumn>
            <Title>List item for sale</Title>
            <TitleWrapper>
              <Title>{data.metadata?.name}</Title>
              <TokenHeader>
                <Icon size={20} svg={getCryptoIconName(chain || "") as any} fill={theme.TITLE} />
                <span>{getDisplayName(token)}</span>
                <CopyButton onCopy={(e) => e?.preventDefault()} text={token} />
              </TokenHeader>
            </TitleWrapper>
            <Subtitle>Type</Subtitle>
            <TypeWrapper>
              <TypeButton isActive={type === TYPES[0]} position="left" onClick={() => setType(TYPES[0])}>
                <FaDollarSign size={24} color={theme.TITLE} />
                <Strong>Fixed Price</Strong>
              </TypeButton>
              <TypeButton isActive={type === TYPES[1]} position="right" onClick={() => setType(TYPES[1])}>
                <FaClock size={24} color={theme.TITLE} />
                <Strong>Timed Auction</Strong>
              </TypeButton>
            </TypeWrapper>
            {type === TYPES[1] && (
              <Fragment>
                <Subtitle>Method</Subtitle>
                <Select>
                  <option>Sell to highest bidder</option>
                </Select>
              </Fragment>
            )}
            <Subtitle>{type === TYPES[0] ? "Price" : "Starting Price"}</Subtitle>
            <PriceRow>
              <Select disabled>
                <option value="eth">ETH</option>
              </Select>
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              />
            </PriceRow>
            <Subtitle>Duration</Subtitle>
            <CalendarSelect onClick={() => setIsModalVisible(true)}>
              <FaRegCalendar size={20} color={theme.TITLE} />
              {dateRange[0].endDate !== undefined
                ? `${parseDate(dateRange[0].startDate)} - ${parseDate(dateRange[0].endDate)}`
                : "Select period"}
            </CalendarSelect>
            <Divider />
            <Subtitle style={{ marginTop: 0 }}>Fees</Subtitle>
            <FeeRow>
              <Fee>Service Fee</Fee>
              <Fee>2.5%</Fee>
            </FeeRow>
            <CompleteButton disabled={isLoading || amount <= 0} onClick={completeListing}>
              Complete listing
            </CompleteButton>
          </LeftColumn>
          <RightColumn>
            <Title>Preview</Title>
            <a rel="noopener noreferrer" target="_blank" href={getImageURL(data.metadata?.image)}>
              <TokenImage src={getImageURL(data.metadata?.image)} />
            </a>
            <ImageData>
              <Strong>{getDisplayName(token)}</Strong>
              <ImageDataWrapper>
                <Label>{data.metadata?.name}</Label>
                <Label>Price: {amount || 0}</Label>
              </ImageDataWrapper>
            </ImageData>
          </RightColumn>
        </Container>
      </Wrapper>
      <Modal
        width="400px"
        title="Select period"
        hasFooter={false}
        isVisible={isModalVisible}
        onCloseButtonPressed={() => setIsModalVisible(false)}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </Modal>
    </Main>
  );
};

export default Listing;
