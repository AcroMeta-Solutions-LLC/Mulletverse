import { LandingProps } from "../config/landingSlice";
import { LeaderboardProps } from "../config/leaderboardSlice";
import { MarketplaceProps } from "../config/marketplaceSlice";
import { PortfolioProps } from "../config/portfolioSlice";
import { ThemeProps } from "../config/themeSlice";
import { TokenProps } from "../config/tokenSlice";

export type StoreType = {
  portfolio: PortfolioProps;
  marketplace: MarketplaceProps;
  token: TokenProps;
  landing: LandingProps;
  leaderboard: LeaderboardProps;
  theme: ThemeProps;
};

export default StoreType;
