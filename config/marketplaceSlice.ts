import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chain } from "web3uikit";
import NFTType from "../types/NFTType";

export type MarketplaceProps = {
  main: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  featured: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  minting: {
    data: NFTType[];
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
  chain?: string;
  token: { getAllTokenIds: Function };
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

const getNFTList = (list: NFTResponse[]): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain: data.chain,
    tokenId: data.token_id,
    fetchMetadata: false,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const getMarketplaceNFTs = createAsyncThunk("marketplace/GET_MARKETPLACE", async (data: GetNFTProps) => {
  const address = "0x6588919ef08aaf176403406539d34fcce873a35b";
  const chain = data.chain || "0x1";
  const limit = data.limit;
  const response = await data.token.getAllTokenIds({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

export const getFeaturedNFTs = createAsyncThunk("marketplace/GET_FEATURED", async (data: GetNFTProps) => {
  const address = "0x6588919ef08aaf176403406539d34fcce873a35b";
  const chain = data.chain || "0x1";
  const limit = data.limit;
  const response = await data.token.getAllTokenIds({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result);
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
  },
});

export const { clearStore } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
