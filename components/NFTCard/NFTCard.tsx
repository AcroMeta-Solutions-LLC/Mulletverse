import Link from "next/link";
import { useMoralis } from "react-moralis";
import { getImageURL } from "../../helpers/getTokenImage";
import NFTType from "../../types/NFTType";
import { Icon } from "web3uikit";
import { IoWalletOutline } from "react-icons/io5";
import { Actions, Buy, Collection, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";
import { useSelector } from "react-redux";
import StoreType from "../../types/StoreType";
import COLORS from "../../constants/colors";
import { getCryptoIconName } from "../../helpers/getCryptoIcon";
import { useRouter } from "next/router";

type NFTBuyCardType = { data: NFTType; width?: string; action?: "Buy" | "Sell"; onSell?: Function };

function NFTCard({ data, width, action, onSell }: NFTBuyCardType) {
  const { isAuthenticated, authenticate } = useMoralis();
  const tokenURL = `/token/${data.address}?id=${data.tokenId}&chain=${data.chain || "eth"}`;
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { push } = useRouter();

  const buyOrSell = (): void => {
    if (!isAuthenticated) {
      authenticate();
    } else {
      if (action === "Sell") {
        !!onSell && onSell();
      } else {
        push({ pathname: tokenURL });
      }
    }
  };

  return (
    <NFTWrapper width={width}>
      <Link href={tokenURL}>
        <Image width={width} alt="foo" src={getImageURL(data.metadata?.image)} />
      </Link>
      <Link href={tokenURL}>
        <Content>
          <Collection>{data.name}</Collection>
          <Title>{data.metadata?.name || data.name}</Title>
        </Content>
      </Link>
      <Actions>
        <Icon
          size={20}
          svg={getCryptoIconName(data.chain || "") as any}
          fill={isDarkMode ? COLORS.CLEAR : COLORS.GREY_800}
        />
        <Buy onClick={buyOrSell}>
          <span>{action || "Buy"}</span>
          <IoWalletOutline size={20} />
        </Buy>
      </Actions>
    </NFTWrapper>
  );
}

export default NFTCard;
