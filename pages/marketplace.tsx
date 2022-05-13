import type { NextPage } from "next";
import { Main, Section, Title } from "../styles/MarketplaceStyled";

const Marketplace: NextPage = () => {
  return (
    <Main>
      <Section>
        <Title>Featured Artists</Title>
      </Section>
      <Section>
        <Title>Marketplace</Title>
      </Section>
      <Section>
        <Title>Minting Market</Title>
      </Section>
    </Main>
  );
};

export default Marketplace;
