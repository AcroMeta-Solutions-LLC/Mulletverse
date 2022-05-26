import NFTType from "../../types/NFTType";
import { ButtonBuy, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";

type NFTBuyCardType = { data: NFTType };

function NFTCard({ data }: NFTBuyCardType) {
  const getImageURL = (): string => {
    if (!data?.metadata || !data.metadata?.image) return "";
    if (data.metadata.image?.includes("ipfs:/")) {
      return data.metadata.image.replace("ipfs:/", "https://ipfs.io");
    }
    return data.metadata.image;
  };

  return (
    <NFTWrapper>
      <Image alt="foo" src={getImageURL()} />
      <Content>
        <Title>{data.metadata?.name || data.name}</Title>
      </Content>
      <ButtonBuy>BUY</ButtonBuy>
    </NFTWrapper>
  );
}

export default NFTCard;
