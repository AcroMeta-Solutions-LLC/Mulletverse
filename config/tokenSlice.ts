import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StoreType from "../types/StoreType";
import TokenType from "../types/TokenType";

export type TokenProps = {
  data: TokenType;
  isLoading: boolean;
  hasError: boolean;
};

type GetNFTProps = {
  address: string;
  token_id: string;
  chain: string;
  token: {
    getTokenIdMetadata: Function;
    getTokenAddressTransfers: Function;
  };
  getWishlist: Function;
};

type SaveToWishlistProps = {
  saveToWishlist: Function;
};

type RemoveFromWishlistProps = {
  getWishlist: Function;
};

const initialState: TokenProps = {
  data: {
    amount: "",
    block_number: "",
    block_number_minted: "",
    contract_type: "",
    last_metadata_sync: "",
    last_token_uri_sync: "",
    metadata: {
      attributes: [],
      description: "",
      external_url: "",
      image: "",
      name: "",
    },
    name: "",
    owner_of: "",
    symbol: "",
    synced_at: "",
    token_address: "",
    token_hash: "",
    token_id: "",
    token_uri: "",
    transfers: [],
    isInWishlist: false,
  },
  hasError: false,
  isLoading: false,
};

export const getTokenData = createAsyncThunk("token/GET_TOKEN", async (data: GetNFTProps) => {
  const transfers = await data.token.getTokenAddressTransfers({ chain: data.chain, address: data.address });
  const response = await data.token.getTokenIdMetadata({
    chain: data.chain,
    address: data.address,
    token_id: data.token_id,
  });
  const wishlist = await data.getWishlist();
  response.transfers = transfers.result;
  response.isInWishlist = wishlist.find((token: any) => token.get("token_id") === response.token_id);
  return response;
});

export const saveTokenInWishlist = createAsyncThunk(
  "token/SAVE_TO_WISHLIST",
  async (data: SaveToWishlistProps, thunkAPI) => {
    const state = thunkAPI.getState() as StoreType;
    data.saveToWishlist(state.token.data);
  },
);

export const removeTokenFromWishlist = createAsyncThunk(
  "token/REMOVE_FROM_WISHLIST",
  async (data: RemoveFromWishlistProps, thunkAPI) => {
    const state = thunkAPI.getState() as StoreType;
    const wishlist = await data.getWishlist();
    const token = wishlist.find((token: any) => token.get("token_id") === state.token.data.token_id);
    token.destroy();
  },
);

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    clearStore(state: TokenProps) {
      state.data = initialState.data;
      state.hasError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.data.metadata = JSON.parse(action.payload.metadata);
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getTokenData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTokenData.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(saveTokenInWishlist.fulfilled, (state) => {
      state.data.isInWishlist = true;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(saveTokenInWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveTokenInWishlist.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(removeTokenFromWishlist.fulfilled, (state) => {
      state.data.isInWishlist = false;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(removeTokenFromWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeTokenFromWishlist.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearStore } = tokenSlice.actions;

export default tokenSlice.reducer;
