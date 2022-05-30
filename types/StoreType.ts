import { LandingProps } from "../config/landingSlice";
import { MarketplaceProps } from "../config/marketplaceSlice";
import { PortfolioProps } from "../config/portfolioSlice";
import { TokenProps } from "../config/tokenSlice";

export type StoreType = {
  portfolio: PortfolioProps;
  marketplace: MarketplaceProps;
  token: TokenProps;
  landing: LandingProps;
};

export default StoreType;
