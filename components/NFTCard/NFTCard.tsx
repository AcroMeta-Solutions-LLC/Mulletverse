import { useMoralis } from "react-moralis";
import NFTType from "../../types/NFTType";
import { ButtonBuy, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";

type NFTBuyCardType = { data: NFTType };

function NFTCard({ data }: NFTBuyCardType) {
  const { isAuthenticated, authenticate } = useMoralis();

  const getImageURL = (): string => {
    if (!data?.metadata || !data.metadata?.image) return "";
    if (data.metadata.image?.includes("ipfs:/")) {
      return data.metadata.image.replace("ipfs:/", "https://ipfs.io");
    }
    return data.metadata.image;
  };

  const buy = (): void => {
    if (!isAuthenticated) authenticate();
  };

  return (
    <NFTWrapper>
      <Image alt="foo" src={getImageURL()} />
      <Content>
        <Title>{data.metadata?.name || data.name}</Title>
      </Content>
      <ButtonBuy onClick={buy}>BUY</ButtonBuy>
    </NFTWrapper>
  );
}

export default NFTCard;
