import { LandingProps } from "../config/landingSlice";
import { MarketplaceProps } from "../config/marketplaceSlice";

export type StoreType = {
  marketplace: MarketplaceProps;
  landing: LandingProps;
};

export default StoreType;
