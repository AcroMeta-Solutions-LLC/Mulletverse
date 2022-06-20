import type { NextPage } from "next";
import {
  Main,
  Container,
  Title,
  SwapArea,
  Swap,
  Header,
  Submit,
  InputWrapper,
  Input,
  ChevronDown,
} from "../../styles/MulletSwapStyled";

const Mulletswap: NextPage = () => {
  return (
    <Main>
      <Container>
        <Title>Mulletswap</Title>
        <SwapArea>
          <Swap>
            <Header>MulletSwap</Header>
            <InputWrapper>
              <Input />
              <ChevronDown />
              <Input />
            </InputWrapper>
            <Submit />
          </Swap>
          <Swap>
            <Header>FiatSwap</Header>
            <InputWrapper>
              <Input />
              <ChevronDown />
              <Input />
            </InputWrapper>
            <Submit />
          </Swap>
        </SwapArea>
      </Container>
    </Main>
  );
};

export default Mulletswap;
