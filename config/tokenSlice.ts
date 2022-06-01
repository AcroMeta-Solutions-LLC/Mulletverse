import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TokenType from "../types/TokenType";

export type TokenProps = {
  data: TokenType;
  isLoading: boolean;
  hasError: boolean;
};

type GetNFTProps = {
  address: string;
  token_id: string;
  token: {
    getTokenIdMetadata: Function;
    getTokenAddressTransfers: Function;
  };
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
  },
  hasError: false,
  isLoading: false,
};

export const getTokenData = createAsyncThunk("token/GET_TOKEN", async (data: GetNFTProps) => {
  const transfers = await data.token.getTokenAddressTransfers({ address: data.address });
  const response = await data.token.getTokenIdMetadata({ address: data.address, token_id: data.token_id });
  response.transfers = transfers.result;
  return response;
});

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
  },
});

export const { clearStore } = tokenSlice.actions;

export default tokenSlice.reducer;
