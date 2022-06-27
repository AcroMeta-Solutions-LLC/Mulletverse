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
import COLORS from "../../constants/colors";

type MinterType = { description: string; amount: number; total: number };

const Minter = ({ description, amount, total }: MinterType) => {
  const [number, setNumber] = useState(0);
  const [shouldSeeMore, setShouldSeeMore] = useState(false);
  return (
    <MinterContainer>
      <Image alt="mullet-coin" src="/assets/mullet-mint.gif" />
      <Wrapper>
        <MintedAmount>{`${amount}/${total}`}</MintedAmount>
        <MinterButtonRow>
          <IncreaseDecrease onClick={() => setNumber(number - 1 <= 0 ? 0 : number - 1)}>-</IncreaseDecrease>
          <NumberToMint>{number}</NumberToMint>
          <IncreaseDecrease onClick={() => setNumber(number + 1)}>+</IncreaseDecrease>
        </MinterButtonRow>
        <MintButton>Mint</MintButton>
        {!shouldSeeMore && <Description>{truncate(description, { length: 150 })}</Description>}
        {shouldSeeMore && <Description>{description}</Description>}
        {!shouldSeeMore && description.length > 146 && (
          <SeeMore onClick={() => setShouldSeeMore(true)}>See more</SeeMore>
        )}
        <SocialRow>
          <FaTwitter size={20} color={COLORS.GREY_200} />
          <FaDiscord size={20} color={COLORS.GREY_200} />
          <FaMedium size={20} color={COLORS.GREY_200} />
          <FaGlobe size={20} color={COLORS.GREY_200} />
        </SocialRow>
      </Wrapper>
      <Image alt="mullet-coin" src="/assets/mullet-mint.gif" />
    </MinterContainer>
  );
};

const Minters: NextPage = () => {
  const mulletmaxiDesc = `
    This is the Mulletmaxi collection. Mulletmaxi's come with several key benefits, 
    including lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum a leo ac iaculis. 
    Vivamus urna sapien, tempus ac urna a, viverra accumsan massa. Aliquam ante massa, finibus quis sapien dictum.`;

  return (
    <Main>
      <Container>
        <Title>Minters Market</Title>
        <List>
          <Minter amount={500} total={10000} description={mulletmaxiDesc} />
        </List>
      </Container>
    </Main>
  );
};

export default Minters;
