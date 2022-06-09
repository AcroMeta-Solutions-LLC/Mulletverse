import type { NextPage } from "next";
import { Section, Main, Title, CollectionImage } from "../styles/LeaderboardStyled";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../constants/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { LeaderboardType } from "../types/LeaderboardType";

const Leaderboard: NextPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardType[]>([]);

  useEffect(() => {
    axios
      .get("https://api.cryptoslam.io/v1/collections/top-100?timeRange=all")
      .then(({ data }: { data: LeaderboardType[] }) => {
        setLeaderboardData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Main>
      <Section>
        <Title>Leaderboard</Title>
        <Table>
          <Thead>
            <Tr style={{ backgroundColor: COLORS.PURPLE.DARK, color: COLORS.WHITE }}>
              <Th></Th>
              <Th>Collection</Th>
              <Th>Upvotes</Th>
              <Th>Floor Price</Th>
              <Th>Volume</Th>
              <Th>24h %</Th>
              <Th>7h %</Th>
              <Th>Owned</Th>
              <Th>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.map((item, i) => (
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
