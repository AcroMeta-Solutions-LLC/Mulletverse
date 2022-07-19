import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
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
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { useNotification } from "web3uikit";
import { AbiItem } from "web3-utils";
import Abi from "../../config/abi.json";
import { useRouter } from "next/router";

type MinterType = {
  description: string;
  amount: number;
  total: number;
  price: number;
  onMint: (amount: number) => void;
};

const Minter = ({ description, amount, total, price, onMint }: MinterType) => {
  const [number, setNumber] = useState(1);
  const [shouldSeeMore, setShouldSeeMore] = useState(false);
  const theme: any = useTheme();
  const { query } = useRouter();
  const allow: string = Array.isArray(query.allow) ? query.allow[0] : query.allow || "";

  return (
    <MinterContainer>
      <Image alt="mullet-coin" src="/assets/mullet-mint.gif" />
      <Wrapper>
        <NextImage alt="mulletmaxi-logo" src="/assets/mulletmaxi_logo.png" width={300} height={80} />
        <MintedAmount>{`${amount}/${total}`}</MintedAmount>
        <MinterButtonRow>
          {allow.toLowerCase() === "multiple" && (
            <Fragment>
              <IncreaseDecrease onClick={() => setNumber(number - 1 <= 1 ? 1 : number - 1)}>-</IncreaseDecrease>
              <NumberToMint>{number}</NumberToMint>
              <IncreaseDecrease onClick={() => setNumber(number + 1)}>+</IncreaseDecrease>
            </Fragment>
          )}
        </MinterButtonRow>
        <MintButton onClick={() => onMint(number)}>Mint for {price} MATIC</MintButton>
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
  const { Moralis, user } = useMoralis();
  const [supply, setSupply] = useState(0);
  const alert = useNotification();
  const MULLETMAXI_ADDRESS = "0x6588919ef08Aaf176403406539D34fCCE873a35b";
  const mulletmaxiDesc = `
  The MulletMaxi Collection is a unique set of mullet-themed avatars. Owning a Mullet Maxi entitles holders to several premium membership features on the Mulletverse platform.`;

  const onMint = async (amount: number) => {
    const { ethereum } = window as any;
    const weiCost = 150000000000000000000;
    const from: string = user?.get("ethAddress");
    const web3 = new Web3(ethereum);
    const contract = new web3.eth.Contract(Abi as AbiItem[], MULLETMAXI_ADDRESS);
    contract.methods
      .mint(amount)
      .send({ from, to: MULLETMAXI_ADDRESS, value: weiCost * amount, gasLimit: "285000" }, (error: any) => {
        alert({ type: "error", title: `Error ${error?.code || ""}`, message: error?.message || "", position: "topR" });
      })
      .on("receipt", (receipt: any) => {
        console.log(receipt);
        alert({ type: "success", title: "Success!", message: "Minting done", position: "topR" });
      });
  };

  const getSupply = async (): Promise<void> => {
    const { ethereum } = window as any;
    const web3 = new Web3(ethereum);
    const contract = new web3.eth.Contract(Abi as AbiItem[], MULLETMAXI_ADDRESS);
    const totalSupply: number = await contract.methods.totalSupply().call();
    setSupply(totalSupply);
  };

  useEffect(() => {
    Moralis.enableWeb3();
    getSupply();
  }, [Moralis]);

  return (
    <Main>
      <Container>
        <Title>Minters Market</Title>
        <List>
          <Minter amount={supply} total={10000} description={mulletmaxiDesc} price={150} onMint={onMint} />
        </List>
      </Container>
    </Main>
  );
};

export default Minters;
