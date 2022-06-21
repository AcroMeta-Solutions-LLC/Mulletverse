import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChainType } from "../types/ChainType";
import { NFTResponse } from "../types/NFTResponse";
import NFTType from "../types/NFTType";

export type ProfileProps = {
  data: Object;
  isLoading: boolean;
  hasError: boolean;
  createdNFT: NFTType[];
  chain: ChainType;
  collection: {
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
  chain: string;
  account: { getNFTs: Function };
  address: string;
  cursor?: string | null;
  limit?: number;
};

const initialState: ProfileProps = {
  data: {},
  hasError: false,
  isLoading: false,
  createdNFT: [],
  chain: "eth",
  collection: {
    data: [],
    hasError: false,
    isLoading: false,
    total: 0,
    nextCursor: "",
    previousCursor: [""],
    page: 0,
  },
};

const getNFTList = (list: NFTResponse[], chain: ChainType = "eth"): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain,
    tokenId: data.token_id,
    fetchMetadata: false,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

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

export const getProfile = createAsyncThunk("profile/GET_PROFILE", async () => {
  return {};
});

export const getCreatedNFT = createAsyncThunk("profile/GET_CREATED_NFT", async (data: GetNFTProps) => {
  return [];
});

export const getCollectionNFTs = createAsyncThunk("profile/GET_COLLECTION_NFT", async (data: GetNFTProps) => {
  const limit = data.limit;
  const response = await data.account.getNFTs({ chain: data.chain, limit, cursor: data.cursor });
  const nftList: NFTType[] = getNFTList(response.result, data.chain as ChainType);
  return {
    data: nftList,
    previousCursor: data.cursor,
    nextCursor: response.cursor,
    total: response.total,
    page: response.page,
  };
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearStore(state: ProfileProps) {
      state.data = {};
      state.hasError = false;
      state.isLoading = false;
      state.createdNFT = [];
    },
    setProfileChain(state: ProfileProps, action: PayloadAction<ChainType>) {
      state.chain = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(getCreatedNFT.fulfilled, (state, action) => {
      state.createdNFT = action.payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getCreatedNFT.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCreatedNFT.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(getCollectionNFTs.fulfilled, (state, action) => {
      state.collection.data = action.payload.data;
      state.collection.isLoading = false;
      state.collection.hasError = false;
      state.collection.nextCursor = action.payload?.nextCursor || "";
      state.collection.total = action.payload.total;
      state.collection.page = action.payload.page;
      state.collection.previousCursor = setPreviousCursor(
        state.collection.previousCursor,
        action.payload?.previousCursor,
      );
    });
    builder.addCase(getCollectionNFTs.pending, (state) => {
      state.collection.isLoading = true;
    });
    builder.addCase(getCollectionNFTs.rejected, (state) => {
      state.collection.isLoading = false;
      state.collection.hasError = true;
    });
  },
});

export const { clearStore, setProfileChain } = profileSlice.actions;

export default profileSlice.reducer;
