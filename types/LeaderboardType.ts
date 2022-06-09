export type LeaderboardType = {
  rank: number;
  iconUrl: string;
  contractName: string;
  productPath: string;
  baseCurrency: string;
  isSalesOnly: boolean;
  value: number;
  valueUSD: number;
  platform: number;
  buyers: number;
  sellers: number;
  owners: number;
  transactions: number;
  previousValue: number;
  previousValueUSD: number;
};
