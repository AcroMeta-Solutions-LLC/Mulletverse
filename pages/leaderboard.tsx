import type { NextPage } from "next";
import { Section, Main, Title, CollectionImage, LoadingWrapper } from "../styles/LeaderboardStyled";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../constants/colors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import StoreType from "../types/StoreType";
import { useSelector } from "react-redux";
import { getLeaderboard } from "../config/leaderboardSlice";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";
import { Loading } from "web3uikit";

const Leaderboard: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { data, isLoading, hasError } = useSelector((store: StoreType) => store.leaderboard);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  const renderLoaderOrError = () => (
    <Main>
      <Section>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={COLORS.PURPLE} />
          </LoadingWrapper>
        )}
      </Section>
    </Main>
  );

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Section>
        <Title>Leaderboard</Title>
        <Table>
          <Thead>
            <Tr style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }}>
              <Th></Th>
              <Th>Collection</Th>
              <Th>Upvotes</Th>
              <Th>Floor Price</Th>
              <Th>Volume</Th>
              <Th>24h %</Th>
              <Th>7d %</Th>
              <Th>Owned</Th>
              <Th>Items</Th>
            </Tr>
          </Thead>
          <Tbody style={{ color: isDarkMode ? COLORS.WHITE : COLORS.GREY_800 }}>
            {data.map((item, i) => (
              <Tr key={i}>
                <Td>
                  <CollectionImage src={item.iconUrl} />
                </Td>
                <Td>{item.contractName}</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>{item.owners}</Td>
                <Td>0</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Section>
    </Main>
  );
};

export default Leaderboard;
