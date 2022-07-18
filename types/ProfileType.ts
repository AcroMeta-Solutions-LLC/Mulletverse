import { InterestType } from "./InterestType";

export type ProfileType = {
  walletAddress: string;
  username?: string;
  bio?: string;
  email?: string;
  twitter?: string;
  discord?: string;
  instagram?: string;
  website?: string;
  interests: InterestType[];
  imageUrl?: string;
  wallets: string[];
};
