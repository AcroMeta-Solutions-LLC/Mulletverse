import Link from "next/link";
import { useMoralis } from "react-moralis";
import { getImageURL } from "../../helpers/getTokenImage";
import NFTType from "../../types/NFTType";
import { Icon } from "web3uikit";
import { IoWalletOutline } from "react-icons/io5";
import { Actions, Buy, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";

type NFTBuyCardType = { data: NFTType };

function NFTCard({ data }: NFTBuyCardType) {
  const { isAuthenticated, authenticate } = useMoralis();
  const tokenURL = `/token/${data.address}?id=${data.tokenId}&chain=${data.chain || "eth"}`;

  const buy = (): void => {
    if (!isAuthenticated) {
      authenticate();
    } else {
      console.log("buy");
    }
  };

  return (
    <NFTWrapper>
      <Link href={tokenURL}>
        <Image alt="foo" src={getImageURL(data.metadata?.image)} />
      </Link>
      <Link href={tokenURL}>
        <Content>
          <span>{data.name}</span>
          <Title>{data.metadata?.name || data.name}</Title>
        </Content>
      </Link>
      <Actions>
        <Icon size={20} svg={data.chain || ("eth" as any)} />
        <Buy>
          <span>Buy</span>
          <IoWalletOutline size={20} />
        </Buy>
      </Actions>
    </NFTWrapper>
  );
}

export default NFTCard;
