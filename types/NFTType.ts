export type NFTType = {
  address: string;
  chain?: string;
  name: string;
  tokenId: string;
  metadata: {
    name: string;
    image: string;
    external_url: string;
    description: string;
    attributes: { key: string; value: string; trait_type: string }[];
  };
};

export default NFTType;
