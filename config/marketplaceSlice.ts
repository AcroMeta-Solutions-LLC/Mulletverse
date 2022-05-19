import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INFTProps } from "web3uikit";

export type MarketplaceProps = {
  nfts: INFTProps[];
  featured: INFTProps[];
  minting: INFTProps[];
  isLoading: boolean;
  hasError: boolean;
  isFeaturedLoading: boolean;
  hasFeaturedError: boolean;
  isMintingLoading: boolean;
  hasMintingError: boolean;
};

type GetNFTProps = {
  cursor?: string;
  account: { getNFTs: Function };
};

const initialState: MarketplaceProps = {
  nfts: [],
  featured: [],
  minting: [],
  isLoading: false,
  hasError: false,
  isFeaturedLoading: false,
  hasFeaturedError: false,
  isMintingLoading: false,
  hasMintingError: false,
};

export const getMarketplaceNFTs = createAsyncThunk(
  "marketplace/GET_MARKETPLACE",
  async (data: GetNFTProps, thunkAPI) => {
    const address = "0x414532523db09980854FD3Fe47711eE3867ce7e9";
    const chain = "eth";
    const limit = 20;
    const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
    const nftList: INFTProps[] =
      response.result?.map((data: any) => ({
        address: data.token_address,
        chain: data.chain,
        tokenId: data.token_id,
        fetchMetadata: false,
        name: data.name,
        metadata: data.metadata ? JSON.parse(data.metadata) : {},
      })) || [];
    return nftList;
  },
);

export const getFeaturedNFTs = createAsyncThunk("marketplace/GET_FEATURED", async (data: GetNFTProps, thunkAPI) => {
  const address = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const chain = "eth";
  const limit = 20;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: INFTProps[] =
    response.result?.map((data: any) => ({
      address: data.token_address,
      chain: data.chain,
      tokenId: data.token_id,
      fetchMetadata: false,
      name: data.name,
      metadata: data.metadata ? JSON.parse(data.metadata) : {},
    })) || [];
  return nftList;
});

export const getMintingNFTs = createAsyncThunk("marketplace/GET_MINTING", async (data: GetNFTProps, thunkAPI) => {
  const address = "0x63914BB0F0D017efe8A72a0b29D9B2A5f138f95d";
  const chain = "eth";
  const limit = 20;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: INFTProps[] =
    response.result?.map((data: any) => ({
      address: data.token_address,
      chain: data.chain,
      tokenId: data.token_id,
      fetchMetadata: false,
      name: data.name,
      metadata: data.metadata ? JSON.parse(data.metadata) : {},
    })) || [];
  return nftList;
});

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    addNFTList(state: MarketplaceProps, { payload }: { payload: INFTProps[] }) {
      state.nfts = payload;
    },
    clearStore(state: MarketplaceProps) {
      state.nfts = [];
      state.minting = [];
      state.featured = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketplaceNFTs.fulfilled, (state, action) => {
      state.nfts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getMarketplaceNFTs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMarketplaceNFTs.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(getFeaturedNFTs.fulfilled, (state, action) => {
      state.featured = action.payload;
      state.isFeaturedLoading = false;
      state.hasFeaturedError = false;
    });
    builder.addCase(getFeaturedNFTs.pending, (state) => {
      state.isFeaturedLoading = true;
    });
    builder.addCase(getFeaturedNFTs.rejected, (state) => {
      state.isFeaturedLoading = false;
      state.hasFeaturedError = true;
    });
    builder.addCase(getMintingNFTs.fulfilled, (state, action) => {
      state.minting = action.payload;
      state.isMintingLoading = false;
      state.hasMintingError = false;
    });
    builder.addCase(getMintingNFTs.pending, (state) => {
      state.isMintingLoading = true;
    });
    builder.addCase(getMintingNFTs.rejected, (state) => {
      state.isMintingLoading = false;
      state.hasMintingError = true;
    });
  },
});

export const { addNFTList, clearStore } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
