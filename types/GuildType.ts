import { InterestType } from "./InterestType";

export type GuildType = {
  address: string;
  guildName?: string;
  bio?: string;
  interests: InterestType[];
  inviteLink?: string;
  imageUrl?: string;
};
