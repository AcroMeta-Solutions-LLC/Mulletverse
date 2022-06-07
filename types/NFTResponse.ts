import { Chain } from "web3uikit";

export type NFTResponse = {
  token_address: string;
  chain: Chain;
  token_id: string;
  name: string;
  metadata: string;
};
