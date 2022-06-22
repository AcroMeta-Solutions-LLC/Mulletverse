import Link from "next/link";
import { useMoralis, useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { getImageURL } from "../../helpers/getTokenImage";
import NFTType from "../../types/NFTType";
import { Icon, useNotification } from "web3uikit";
import { IoWalletOutline, IoThumbsUpSharp, IoThumbsUpOutline } from "react-icons/io5";
import { Actions, Buy, ChainThumbsUp, Collection, Content, Image, NFTWrapper, Title } from "./NFTCardStyled";
import { useSelector } from "react-redux";
import StoreType from "../../types/StoreType";
import COLORS from "../../constants/colors";
import { getCryptoIconName } from "../../helpers/getCryptoIcon";
import { useEffect, useState } from "react";

type NFTBuyCardType = { data: NFTType; width?: string; action?: "Buy" | "Sell"; hasLike?: boolean };

function NFTCard({ data, width, action, hasLike }: NFTBuyCardType) {
  const { isAuthenticated, authenticate, user } = useMoralis();
  const tokenURL = `/token/${data.address}?id=${data.tokenId}&chain=${data.chain || "eth"}`;
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  const { save: saveLike } = useNewMoralisObject("Likes");
  const { fetch: fetchLike } = useMoralisQuery("Likes", (query) =>
    query.equalTo("address", data.address).equalTo("user", user?.get("ethAddress")),
  );
  const alert = useNotification();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(hasLike || false);
  }, [hasLike]);

  const buyOrSell = (): void => {
    if (!isAuthenticated) {
      authenticate();
    } else {
      console.log(action);
    }
  };

  const alertError = (): void => {
    alert({ type: "error", title: "Oops, something went wrong", message: "", position: "topR" });
  };

  const like = () => {
    saveLike({ address: data.address, chain: data.chain, tokenId: data.tokenId, user: user?.get("ethAddress") })
      .then(() => setIsLiked(true))
      .catch(() => alertError());
  };

  const dislike = () => {
    fetchLike({
      onSuccess: (likes) => {
        const likeObject = likes[0];
        likeObject
          .destroy()
          .then(() => setIsLiked(false))
          .catch(() => alertError());
      },
    });
  };

  return (
    <NFTWrapper width={width}>
      <Link href={tokenURL}>
        <Image alt="foo" src={getImageURL(data.metadata?.image)} />
      </Link>
      <Link href={tokenURL}>
        <Content>
          <Collection>{data.name}</Collection>
          <Title>{data.metadata?.name || data.name}</Title>
        </Content>
      </Link>
      <Actions>
        <ChainThumbsUp>
          <Icon
            size={20}
            svg={getCryptoIconName(data.chain || "") as any}
            fill={isDarkMode ? COLORS.CLEAR : COLORS.GREY_800}
          />
          {isLiked && <IoThumbsUpSharp size={20} onClick={dislike} />}
          {!isLiked && <IoThumbsUpOutline size={20} onClick={like} />}
        </ChainThumbsUp>
        <Buy onClick={buyOrSell}>
          <span>{action || "Buy"}</span>
          <IoWalletOutline size={20} />
        </Buy>
      </Actions>
    </NFTWrapper>
  );
}

export default NFTCard;
