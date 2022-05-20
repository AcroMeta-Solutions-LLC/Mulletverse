import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INFTProps, Chain } from "web3uikit";

export type MarketplaceProps = {
  main: {
    data: INFTProps[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  featured: {
    data: INFTProps[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  minting: {
    data: INFTProps[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
};

type GetNFTProps = {
  cursor?: string | null;
  limit: number;
  account: { getNFTs: Function };
};

type NFTResponse = {
  token_address: string;
  chain: Chain;
  token_id: string;
  name: string;
  metadata: string;
};

const initialState: MarketplaceProps = {
  main: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
  featured: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
  minting: { data: [], hasError: false, isLoading: false, total: 0, nextCursor: "", previousCursor: [""], page: 0 },
};

const getNFTList = (data: NFTResponse[]): INFTProps[] => {
  const filteredList = data.filter((nft) => !!nft.metadata);
  return (
    filteredList?.map((data: NFTResponse) => ({
      address: data.token_address,
      chain: data.chain,
      tokenId: data.token_id,
      fetchMetadata: false,
      name: data.name,
      metadata: JSON.parse(data.metadata),
    })) || []
  );
};

export const getMarketplaceNFTs = createAsyncThunk("marketplace/GET_MARKETPLACE", async (data: GetNFTProps) => {
  const address = "0x4F5beD793202f22d17CDC3d6eBe538c07A474126";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: INFTProps[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

export const getFeaturedNFTs = createAsyncThunk("marketplace/GET_FEATURED", async (data: GetNFTProps) => {
  const address = "0xd45058Bf25BBD8F586124C479D384c8C708CE23A";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: INFTProps[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

export const getMintingNFTs = createAsyncThunk("marketplace/GET_MINTING", async (data: GetNFTProps) => {
  const address = "0x63914BB0F0D017efe8A72a0b29D9B2A5f138f95d";
  const chain = "eth";
  const limit = data.limit;
  const response = await data.account.getNFTs({ address, chain, limit, cursor: data.cursor });
  const nftList: INFTProps[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

const setPreviousCursor = (cursorList: string[], newCursor: string | null | undefined): string[] => {
  if (newCursor === null || newCursor === undefined) return cursorList;
  let cursors = [...cursorList];
  if (cursors[cursors.length - 2] === newCursor) {
    cursors.splice(-1);
  } else {
    cursors = [...cursors, newCursor];
  }
  return cursors;
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    clearStore(state: MarketplaceProps) {
      state.main.data = [];
      state.minting.data = [];
      state.featured.data = [];
      state.main.nextCursor = "";
      state.main.previousCursor = [""];
      state.main.page = 0;
      state.main.total = 0;
      state.main.hasError = false;
      state.minting.nextCursor = "";
      state.minting.previousCursor = [""];
      state.minting.page = 0;
      state.minting.total = 0;
      state.minting.hasError = false;
      state.featured.nextCursor = "";
      state.featured.previousCursor = [""];
      state.featured.page = 0;
      state.featured.total = 0;
      state.featured.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketplaceNFTs.fulfilled, (state, action) => {
      state.main.data = action.payload.data;
      state.main.isLoading = false;
      state.main.hasError = false;
      state.main.nextCursor = action.payload?.nextCursor || "";
      state.main.total = action.payload.total;
      state.main.page = action.payload.page;
      state.main.previousCursor = setPreviousCursor(state.main.previousCursor, action.payload?.previousCursor);
    });
    builder.addCase(getMarketplaceNFTs.pending, (state) => {
      state.main.isLoading = true;
    });
    builder.addCase(getMarketplaceNFTs.rejected, (state) => {
      state.main.isLoading = false;
      state.main.hasError = true;
    });
    builder.addCase(getFeaturedNFTs.fulfilled, (state, action) => {
      state.featured.data = action.payload.data;
      state.featured.isLoading = false;
      state.featured.hasError = false;
      state.featured.nextCursor = action.payload?.nextCursor || "";
      state.featured.total = action.payload.total;
      state.featured.page = action.payload.page;
      state.featured.previousCursor = setPreviousCursor(state.featured.previousCursor, action.payload?.previousCursor);
    });
    builder.addCase(getFeaturedNFTs.pending, (state) => {
      state.featured.isLoading = true;
    });
    builder.addCase(getFeaturedNFTs.rejected, (state) => {
      state.featured.isLoading = false;
      state.featured.hasError = true;
    });
    builder.addCase(getMintingNFTs.fulfilled, (state, action) => {
      state.minting.data = action.payload.data;
      state.minting.isLoading = false;
      state.minting.hasError = false;
      state.minting.nextCursor = action.payload?.nextCursor || "";
      state.minting.total = action.payload.total;
      state.minting.page = action.payload.page;
      state.minting.previousCursor = setPreviousCursor(state.minting.previousCursor, action.payload?.previousCursor);
    });
    builder.addCase(getMintingNFTs.pending, (state) => {
      state.minting.isLoading = true;
    });
    builder.addCase(getMintingNFTs.rejected, (state) => {
      state.minting.isLoading = false;
      state.minting.hasError = true;
    });
  },
});

export const { clearStore } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;