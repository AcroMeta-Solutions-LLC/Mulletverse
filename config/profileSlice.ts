import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChainType } from "../types/ChainType";
import { NFTResponse } from "../types/NFTResponse";
import NFTType from "../types/NFTType";

export type ProfileProps = {
  data: Object;
  isLoading: boolean;
  hasError: boolean;
  createdNFT: NFTType[];
};

type GetNFTProps = {
  chain: string;
  account: { getNFTs: Function };
  address: string;
};

const initialState: ProfileProps = {
  data: {},
  hasError: false,
  isLoading: false,
  createdNFT: [],
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

export const getProfile = createAsyncThunk("profile/GET_PROFILE", async () => {
  return {};
});

export const getCreatedNFT = createAsyncThunk("portfolio/GET_CREATED_NFT", async (data: GetNFTProps) => {
  const response = await data.account.getNFTs({ chain: data.chain, address: data.address });
  const nftList: NFTType[] = getNFTList(response.result, data.chain as ChainType);
  return nftList;
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
  },
});

export const { clearStore } = profileSlice.actions;

export default profileSlice.reducer;
