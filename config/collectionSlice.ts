import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Chain } from "web3uikit";
import { ChainType } from "../types/ChainType";
import { LikeType } from "../types/LikesType";
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
  likes: number;
  hasLike: boolean;
  isLoadingLikes: boolean;
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
  likes: 0,
  hasLike: false,
  isLoadingLikes: false,
};

const getNFTList = (list: NFTResponse[], chain: ChainType): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain,
    tokenId: data.token_id,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const getCollectionData = createAsyncThunk("collection/GET_COLLECTION", async (data: GetNFTProps) => {
  const address = data.address;
  const chain: ChainType = data.chain || "0x1";
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

export const getLikes = createAsyncThunk(
  "collection/GET_LIKES",
  async (data: { fetchLikes: Function; owner: string; address: string }) => {
    const response = await data.fetchLikes();
    const hasLike = response.find(
      (like: LikeType) => data.owner === like.get("owner") && data.address === like.get("address"),
    );
    return { likes: response.filter((like: LikeType) => like.get("address") === data.address).length, hasLike };
  },
);

export const saveCollectionLike = createAsyncThunk(
  "collection/SAVE_LIKE",
  async (data: { address: string; saveLike: Function; owner: string }) => {
    await data.saveLike({ address: data.address, owner: data.owner });
    return true;
  },
);

export const removeCollectionLike = createAsyncThunk(
  "collection/REMOVE_LIKE",
  async (data: { fetchLikes: Function; owner: string }) => {
    const likeList = await data.fetchLikes();
    const like = likeList.find((l: LikeType) => data.owner === l.get("owner"));
    await like?.destroy();
    return false;
  },
);

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
      state.likes = 0;
      state.hasLike = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCollectionData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
      state.hasError = false;
      state.nextCursor = action.payload?.nextCursor || "";
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.previousCursor = setPreviousCursor(state.previousCursor, action.payload?.previousCursor);
      state.name = action.payload.name;
    });
    builder.addCase(getCollectionData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCollectionData.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.isLoadingLikes = false;
      state.hasError = false;
      state.likes = action.payload.likes;
      state.hasLike = action.payload.hasLike;
    });
    builder.addCase(getLikes.pending, (state) => {
      state.isLoadingLikes = true;
    });
    builder.addCase(getLikes.rejected, (state) => {
      state.isLoadingLikes = false;
      state.hasError = true;
    });
    builder.addCase(saveCollectionLike.fulfilled, (state, action) => {
      state.hasError = false;
      state.isLoadingLikes = false;
      state.hasLike = action.payload;
      state.likes = state.likes + 1;
    });
    builder.addCase(saveCollectionLike.pending, (state) => {
      state.isLoadingLikes = true;
    });
    builder.addCase(saveCollectionLike.rejected, (state) => {
      state.hasError = true;
      state.isLoadingLikes = false;
    });
    builder.addCase(removeCollectionLike.fulfilled, (state, action) => {
      state.hasError = false;
      state.isLoadingLikes = false;
      state.hasLike = action.payload;
      state.likes = state.likes - 1;
    });
    builder.addCase(removeCollectionLike.pending, (state) => {
      state.isLoadingLikes = true;
    });
    builder.addCase(removeCollectionLike.rejected, (state) => {
      state.hasError = true;
      state.isLoadingLikes = false;
    });
  },
});

export const { clearStore } = collectionSlice.actions;

export default collectionSlice.reducer;
