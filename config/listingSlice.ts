import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TokenType from "../types/TokenType";

export type ListingProps = {
  data: TokenType;
  isLoading: boolean;
  hasError: boolean;
};

type GetTokenProps = {
  address: string;
  token_id: string;
  chain: string;
  token: {
    getTokenIdMetadata: Function;
  };
};

const initialState: ListingProps = {
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

export const getTokenData = createAsyncThunk("listing/GET_TOKEN", async (data: GetTokenProps) => {
  const response = await data.token.getTokenIdMetadata({
    chain: data.chain,
    address: data.address,
    token_id: data.token_id,
  });
  response.chain = data.chain;
  return response;
});

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearStore(state: ListingProps) {
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
  },
});

export const { clearStore } = listingSlice.actions;

export default listingSlice.reducer;
