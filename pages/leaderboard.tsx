import type { NextPage } from "next";
import { Section, Main, Title } from "../styles/LeaderboardStyled";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import COLORS from "../constants/colors";

const Leaderboard: NextPage = () => {
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
            {[...Array(10)].map((_, i) => (
              <Tr key={i}>
                <Td>Tablescon</Td>
                <Td>9 April 2019</Td>
                <Td>East Annex</Td>
                <Td>Tablescon</Td>
                <Td>9 April 2019</Td>
                <Td>East Annex</Td>
                <Td>9 April 2019</Td>
                <Td>Tablescon</Td>
                <Td>Tablescon</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Section>
    </Main>
  );
};

export default Leaderboard;
