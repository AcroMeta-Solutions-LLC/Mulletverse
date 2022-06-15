import { getImageURL } from "../../helpers/getTokenImage";
import {
  Container,
  Data,
  DataRow,
  Image,
  Title,
  TitleWrapper,
  DataTitle,
  DataLabel,
  NFT,
  NFTRow,
} from "./CollectionCardStyled";

type CollectionCardPropType = {
  collection: {
    address: string;
    name: string;
    owners: number;
    floorPrice: number;
    volume: number;
    imageURL: string;
    items: {
      address: string;
      chain: string;
      imageURL: string;
    }[];
  };
};

function CollectionCard({ collection }: CollectionCardPropType) {
  return (
    <Container>
      <TitleWrapper>
        <Image alt="collection-image" src={getImageURL(collection.imageURL)} />
        <Title>{collection.name}</Title>
      </TitleWrapper>
      <DataRow>
        <Data>
          <DataTitle>{collection.items.length}</DataTitle>
          <DataLabel>Items</DataLabel>
        </Data>
        <Data>
          <DataTitle>{collection.owners}</DataTitle>
          <DataLabel>Owners</DataLabel>
        </Data>
        <Data>
          <DataTitle>{collection.floorPrice}</DataTitle>
          <DataLabel>Floor price</DataLabel>
        </Data>
        <Data>
          <DataTitle>{collection.volume}</DataTitle>
          <DataLabel>Volume</DataLabel>
        </Data>
      </DataRow>
      <NFTRow>
        <NFT src={collection.items[0]?.imageURL} />
        <NFT src={collection.items[1]?.imageURL} />
        <NFT src={collection.items[2]?.imageURL} />
        <NFT src={collection.items[3]?.imageURL} hasMore={collection.items.length > 4}>
          {collection.items.length > 4 && `+ ${collection.items.length}`}
        </NFT>
      </NFTRow>
    </Container>
  );
}

export default CollectionCard;
