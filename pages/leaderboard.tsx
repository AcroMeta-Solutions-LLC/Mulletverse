import type { NextPage } from "next";
import { Section, Main, Title, CollectionImage, LoadingWrapper, Header } from "../styles/LeaderboardStyled";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import StoreType from "../types/StoreType";
import { useSelector } from "react-redux";
import { getLeaderboard } from "../config/leaderboardSlice";
import ErrorBanner from "../components/ErrorBanner/ErrorBanner";
import { Loading, Select } from "web3uikit";
import { useTheme } from "styled-components";
import { CHAINS } from "../constants/chains";
import { ChainType } from "../types/ChainType";
import { SCREEN } from "../constants/screen";

const Leaderboard: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, hasError } = useSelector((store: StoreType) => store.leaderboard);
  const theme: any = useTheme();
  const [chain, setChain] = useState<ChainType>("matic");

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  const renderLoaderOrError = () => (
    <Main>
      <Section>
        {hasError && <ErrorBanner hasError={hasError} />}
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={theme.PRIMARY} />
          </LoadingWrapper>
        )}
      </Section>
    </Main>
  );

  return isLoading || hasError ? (
    renderLoaderOrError()
  ) : (
    <Main>
      <Header>
        <Select
          defaultOptionIndex={0}
          onChange={({ id }) => setChain(id as ChainType)}
          options={CHAINS}
          prefixText="Chain:"
          value={chain}
        />
      </Header>
      <Section>
        <Title>Leaderboard</Title>
        <Table style={{ maxWidth: SCREEN.TABLET_BIG }}>
          <Thead>
            <Tr style={{ backgroundColor: theme.PRIMARY, color: theme.CARD }}>
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
          <Tbody style={{ color: theme.TEXT }}>
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
