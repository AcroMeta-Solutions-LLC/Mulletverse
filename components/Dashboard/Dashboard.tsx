import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar, CopyButton, Loading } from "web3uikit";
import { clearStore, getAccountNFTs } from "../../config/portfolioSlice";
import { AppDispatch } from "../../config/store";
import COLORS from "../../constants/colors";
import { getDisplayName } from "../../helpers/getDisplayName";
import { Wrapper } from "../../styles/AccountStyled";
import StoreType from "../../types/StoreType";
import Collapsable from "../Collapsable/Collapsable";
import ErrorBanner from "../ErrorBanner/ErrorBanner";
import { LoadingWrapper } from "../NFTGrid/NFTGridStyled";
import { Main, Section } from "./DashboardStyled";

const Dashboard = () => {
  const { isInitialized, user, chainId } = useMoralis();
  const dispatch = useDispatch<AppDispatch>();
  // const { fetch: getWishlist } = useMoralisQuery("Wishlist");
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { data, isLoading, hasError } = useSelector(
    (store: StoreType) => store.portfolio.personal
  );

  useEffect(() => {
    if (isInitialized && chainId) {
      dispatch(getAccountNFTs({ account: user?.get("ethAddress"), chainId }));
    }
    return () => {
      dispatch(clearStore());
    };
  }, [isInitialized, dispatch, user, chainId]);

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
      <Section>
        <Collapsable isOpen title="Portfolio">
          <Table>
            <Thead>
              <Tr
                style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }}
              >
                <Th></Th>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Mint Date</Th>
                <Th>Mint Hash</Th>
              </Tr>
            </Thead>
            <Tbody
              style={{ color: isDarkMode ? COLORS.WHITE : COLORS.GREY_800 }}
            >
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td
                    style={{
                      width: "4rem",
                    }}
                  >
                    <Avatar
                      image={
                        item.image_uri === null
                          ? ""
                          : item.image_uri.includes("https")
                          ? item.image_uri
                          : `https://ipfs.io/ipfs/${item.image_uri}`
                      }
                      isRounded
                      size={42}
                      theme="image"
                    />
                  </Td>
                  <Td>{item.token_id}</Td>
                  <Td>{item.name === null ? "No Name" : item.name}</Td>
                  <Td>
                    {new Date(item.mint_timestamp).toLocaleDateString("en-GB")}
                  </Td>
                  <Td>
                    {getDisplayName(item.mint_transaction_hash)}
                    <CopyButton
                      onCopy={(e) => e?.preventDefault()}
                      text={item.mint_transaction_hash}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Collapsable>
      </Section>
    </Main>
  );
};

export default Dashboard;
