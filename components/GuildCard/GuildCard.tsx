import { getImageURL } from "../../helpers/getTokenImage";
import { GuildType } from "../../types/GuildType";
import { Container, Data, DataRow, Image, Title, TitleWrapper, DataTitle, DataLabel } from "./GuildCardStyled";

function GuildCard(data: GuildType) {
  return (
    <Container>
      <TitleWrapper>
        <Image alt="collection-image" src={getImageURL(data.imageUrl || "")} />
        <Title>{data.guildName}</Title>
      </TitleWrapper>
      <DataRow>
        <Data>
          <DataTitle>0</DataTitle>
          <DataLabel>Followers</DataLabel>
        </Data>
        <Data>
          <DataTitle>1</DataTitle>
          <DataLabel>Members</DataLabel>
        </Data>
        <Data>
          <DataTitle>1</DataTitle>
          <DataLabel>Holders</DataLabel>
        </Data>
        <Data>
          <DataTitle>0</DataTitle>
          <DataLabel>Volume</DataLabel>
        </Data>
      </DataRow>
    </Container>
  );
}

export default GuildCard;
