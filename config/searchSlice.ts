import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chain } from "web3uikit";
import { ChainType } from "../types/ChainType";
import NFTType from "../types/NFTType";

export type SearchProps = {
  data: NFTType[];
  isLoading: boolean;
  hasError: boolean;
  total: number;
  previousCursor: string[];
  nextCursor?: string;
  page: number;
};

type SearchNFTsProps = {
  cursor?: string | null;
  limit?: number;
  options: { q: string; chain: ChainType; filter: string };
  token: { searchNFTs: Function };
};

type NFTResponse = {
  token_address: string;
  chain: Chain;
  token_id: string;
  name: string;
  metadata: string;
};

const initialState: SearchProps = {
  data: [],
  hasError: false,
  isLoading: false,
  total: 0,
  nextCursor: "",
  previousCursor: [""],
  page: 0,
};

const getNFTList = (list: NFTResponse[], chain: ChainType): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain: chain,
    tokenId: data.token_id,
    fetchMetadata: false,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const searchNFTs = createAsyncThunk("search/SEARCH_NFT", async (data: SearchNFTsProps) => {
  const response = await data.token.searchNFTs({ ...data.options, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result, data.options.chain);
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

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearStore(state: SearchProps) {
      state.data = [];
      state.nextCursor = "";
      state.previousCursor = [""];
      state.page = 0;
      state.total = 0;
      state.hasError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchNFTs.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
      state.nextCursor = action.payload?.nextCursor || "";
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.previousCursor = setPreviousCursor(state.previousCursor, action.payload?.previousCursor);
    });
    builder.addCase(searchNFTs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchNFTs.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearStore } = searchSlice.actions;

export default searchSlice.reducer;
