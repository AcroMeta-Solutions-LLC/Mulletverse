import { AccountProps } from "../config/accountSlice";
import { CollectionProps } from "../config/collectionSlice";
import { LandingProps } from "../config/landingSlice";
import { LeaderboardProps } from "../config/leaderboardSlice";
import { ListingProps } from "../config/listingSlice";
import { MarketplaceProps } from "../config/marketplaceSlice";
import { PortfolioProps } from "../config/portfolioSlice";
import { ProfileProps } from "../config/profileSlice";
import { SearchProps } from "../config/searchSlice";
import { ThemeProps } from "../config/themeSlice";
import { TokenProps } from "../config/tokenSlice";

export type StoreType = {
  portfolio: PortfolioProps;
  marketplace: MarketplaceProps;
  token: TokenProps;
  landing: LandingProps;
  leaderboard: LeaderboardProps;
  theme: ThemeProps;
  search: SearchProps;
  profile: ProfileProps;
  account: AccountProps;
  listing: ListingProps;
  collection: CollectionProps;
};

export default StoreType;
