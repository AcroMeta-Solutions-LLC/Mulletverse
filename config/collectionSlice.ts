import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chain } from "web3uikit";
import { ChainType } from "../types/ChainType";
import NFTType from "../types/NFTType";

export type CollectionProps = {
  data: NFTType[];
  isLoading: boolean;
  hasError: boolean;
  total: number;
  previousCursor: string[];
  nextCursor?: string;
  page: number;
  name: string;
};

type GetNFTProps = {
  cursor?: string | null;
  limit: number;
  chain: ChainType;
  address: string;
  token: { getAllTokenIds: Function; getNFTMetadata: Function };
};

type NFTResponse = {
  token_address: string;
  chain: Chain;
  token_id: string;
  name: string;
  metadata: string;
};

const initialState: CollectionProps = {
  data: [],
  hasError: false,
  isLoading: false,
  total: 0,
  nextCursor: "",
  previousCursor: [""],
  page: 0,
  name: "",
};

const getNFTList = (list: NFTResponse[], chain: ChainType): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain,
    tokenId: data.token_id,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const getCollectionNFTs = createAsyncThunk("collection/GET_COLLECTION", async (data: GetNFTProps) => {
  const address = data.address;
  const chain: ChainType = data.chain || "eth";
  const limit = data.limit;
  const response = await data.token.getAllTokenIds({ address, chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result, chain);
  const metadata = await data.token.getNFTMetadata({ chain, address });
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
    name: metadata.name,
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

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearStore(state: CollectionProps) {
      state.data = [];
      state.nextCursor = "";
      state.previousCursor = [""];
      state.page = 0;
      state.total = 0;
      state.hasError = false;
      state.name = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCollectionNFTs.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
      state.nextCursor = action.payload?.nextCursor || "";
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.previousCursor = setPreviousCursor(state.previousCursor, action.payload?.previousCursor);
      state.name = action.payload.name;
    });
    builder.addCase(getCollectionNFTs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCollectionNFTs.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearStore } = collectionSlice.actions;

export default collectionSlice.reducer;
