import { INFTProps, NFT } from "web3uikit";
import { ButtonNFTBuy, NFTWrapper } from "./NFTBuyCardStyled";

type NFTBuyCardType = { data: INFTProps };

function NFTBuyCard({ data }: NFTBuyCardType) {
  return (
    <NFTWrapper>
      <NFT {...data} />
      <ButtonNFTBuy>BUY</ButtonNFTBuy>
    </NFTWrapper>
  );
}

export default NFTBuyCard;
