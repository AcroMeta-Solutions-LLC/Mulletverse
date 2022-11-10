import type { NextPage } from "next";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Avatar } from "web3uikit";
import Collapsable from "../components/Collapsable/Collapsable";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";
import { clearStore, getLeaderboard } from "../config/leaderboardSlice";
import { AppDispatch } from "../config/store";
import COLORS from "../constants/colors";
import { Main, Section, TableContainer } from "../styles/LeaderboardStyled";
import StoreType from "../types/StoreType";

const Leaderboard: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasError } = useSelector(
    (store: StoreType) => store.leaderboard
  );
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { user, chainId, isInitialized } = useMoralis();

  useEffect(() => {
    if (isInitialized && chainId)
      dispatch(getLeaderboard({ account: user?.get("ethAddress"), chainId }));
    return () => {
      dispatch(clearStore());
    };
  }, [dispatch, user, chainId, isInitialized]);

  const renderLoaderOrError = () => (
    <Main>
      <Section>{hasError && <ErrorBanner hasError={hasError} />}</Section>
    </Main>
  );

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <TableContainer>
        <Collapsable isOpen title="Portfolio">
          <Table>
            <Thead>
              <Tr
                style={{
                  backgroundColor: COLORS.PURPLE,
                  color: COLORS.WHITE,
                }}
              >
                <Th></Th>
                <Th>Address</Th>
                <Th>Name</Th>
                <Th>Items Total</Th>
                <Th>Total Holding</Th>
              </Tr>
            </Thead>
            <Tbody
              style={{ color: isDarkMode ? COLORS.WHITE : COLORS.GREY_800 }}
            >
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td
                    style={{
                      width: "8rem",
                    }}
                  >
                    <Avatar
                      image={item.logo_url}
                      isRounded
                      size={42}
                      theme="image"
                    />
                  </Td>
                  <Td>{item.contract_address}</Td>
                  <Td>
                    {item.contract_name === "" ? "NaN" : item.contract_name}
                  </Td>
                  <Td>{item.items_total}</Td>
                  <Td>{item.owns_total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Collapsable>
      </TableContainer>
    </Main>
  );
};

export default Leaderboard;
