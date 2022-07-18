import type { NextPage } from "next";
import { useState } from "react";
import { truncate } from "lodash";
import { FaTwitter, FaDiscord, FaMedium, FaGlobe } from "react-icons/fa";
import {
  Container,
  Description,
  Image,
  IncreaseDecrease,
  List,
  Main,
  MintButton,
  MintedAmount,
  MinterButtonRow,
  MinterContainer,
  NumberToMint,
  SeeMore,
  SocialRow,
  Title,
  Wrapper,
} from "../../styles/MintersStyled";
import NextImage from "next/image";
import { useTheme } from "styled-components";

type MinterType = { description: string; amount: number; total: number; price: number };

const Minter = ({ description, amount, total, price }: MinterType) => {
  const [number, setNumber] = useState(1);
  const [shouldSeeMore, setShouldSeeMore] = useState(false);
  const theme: any = useTheme();

  return (
    <MinterContainer>
      <Image alt="mullet-coin" src="/assets/mullet-mint.gif" />
      <Wrapper>
        <NextImage alt="mulletmaxi-logo" src="/assets/mulletmaxi_logo.png" width={300} height={80} />
        <MintedAmount>{`${amount}/${total}`}</MintedAmount>
        <MinterButtonRow>
          <IncreaseDecrease onClick={() => setNumber(number - 1 <= 1 ? 1 : number - 1)}>-</IncreaseDecrease>
          <NumberToMint>{number}</NumberToMint>
          <IncreaseDecrease onClick={() => setNumber(number + 1)}>+</IncreaseDecrease>
        </MinterButtonRow>
        <MintButton>Mint for {price} MATIC</MintButton>
        {!shouldSeeMore && <Description>{truncate(description, { length: 150 })}</Description>}
        {shouldSeeMore && <Description>{description}</Description>}
        {!shouldSeeMore && description.length > 146 && (
          <SeeMore onClick={() => setShouldSeeMore(true)}>See more</SeeMore>
        )}
        <SocialRow>
          <a href="https://twitter.com/Mulletverse" target="_blank" rel="noreferrer">
            <FaTwitter size={20} color={theme.TEXT} />
          </a>
          <a href="https://discord.gg/uWtaC94MbE" target="_blank" rel="noreferrer">
            <FaDiscord size={20} color={theme.TEXT} />
          </a>
          <a href="https://medium.com/@mulletverse" target="_blank" rel="noreferrer">
            <FaMedium size={20} color={theme.TEXT} />
          </a>
          <a href="https://mulletverse.io/" target="_blank" rel="noreferrer">
            <FaGlobe size={20} color={theme.TEXT} />
          </a>
        </SocialRow>
      </Wrapper>
      <Image alt="mullet-coin" src="/assets/mullet-mint.gif" />
    </MinterContainer>
  );
};

const Minters: NextPage = () => {
  const mulletmaxiDesc = `
  The MulletMaxi Collection is a unique set of mullet-themed avatars. Owning a Mullet Maxi entitles holders to several premium membership features on the Mulletverse platform.`;
  return (
    <Main>
      <Container>
        <Title>Minters Market</Title>
        <List>
          <Minter amount={0} total={10000} description={mulletmaxiDesc} price={150} />
        </List>
      </Container>
    </Main>
  );
};

export default Minters;
