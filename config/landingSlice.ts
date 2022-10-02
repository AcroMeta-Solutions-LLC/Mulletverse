import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NFTType from "../types/NFTType";

export type LandingProps = {
  nfts: NFTType[];
  isLoading: boolean;
  hasError: boolean;
};

type GetNFTProps = {
  address: string;
  chain: string;
  limit: number;
  account: { getNFTs: Function };
};

const initialState: LandingProps = {
  nfts: [],
  isLoading: false,
  hasError: false,
};

export const getNFTs = createAsyncThunk("landing/GET_NFTS", async (data: GetNFTProps) => {
  const response = await data.account.getNFTs({ address: data.address, chain: data.chain, limit: data.limit });
  const nftList: NFTType[] =
    response.result?.map((data: any) => ({
      address: data.token_address,
      chain: data.chain,
      tokenId: data.token_id,
      fetchMetadata: false,
      name: data.name,
      metadata: data.metadata ? JSON.parse(data.metadata) : {},
    })) || [];
  return nftList;
});

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    addNFTList(state: LandingProps, { payload }: { payload: NFTType[] }) {
      state.nfts = payload;
    },
    clearStore(state: LandingProps) {
      state.nfts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNFTs.fulfilled, (state, action) => {
      state.nfts = action.payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getNFTs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNFTs.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { addNFTList, clearStore } = landingSlice.actions;

export default landingSlice.reducer;
