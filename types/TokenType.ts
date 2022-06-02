import TransferType from "./TransferType";

export type TokenType = {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: {
    name: string;
    image: string;
    external_url: string;
    description: string;
    attributes: { key: string; value: string; trait_type: string }[];
  };
  name: string;
  owner_of: string;
  symbol: string;
  synced_at: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
  transfers?: TransferType[];
  isInWishlist?: boolean;
};

export default TokenType;
