import Link from "next/link";
import { useMoralis } from "react-moralis";
import { getImageURL } from "../../helpers/getTokenImage";
import NFTType from "../../types/NFTType";
import { ButtonBuy, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";

type NFTBuyCardType = { data: NFTType };

function NFTCard({ data }: NFTBuyCardType) {
  const { isAuthenticated, authenticate } = useMoralis();
  const tokenURL = `/token/${data.address}?id=${data.tokenId}`;

  const buy = (): void => {
    if (!isAuthenticated) authenticate();
  };

  return (
    <NFTWrapper>
      <Link href={tokenURL}>
        <Image alt="foo" src={getImageURL(data.metadata?.image)} />
      </Link>
      <Link href={tokenURL}>
        <Content>
          <Title>{data.metadata?.name || data.name}</Title>
        </Content>
      </Link>
      <ButtonBuy onClick={buy}>BUY</ButtonBuy>
    </NFTWrapper>
  );
}

export default NFTCard;
