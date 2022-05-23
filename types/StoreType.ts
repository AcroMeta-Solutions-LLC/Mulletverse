import { LandingProps } from "../config/landingSlice";
import { MarketplaceProps } from "../config/marketplaceSlice";
import { PortfolioProps } from "../config/portfolioSlice";

export type StoreType = {
  portfolio: PortfolioProps;
  marketplace: MarketplaceProps;
  landing: LandingProps;
};

export default StoreType;
