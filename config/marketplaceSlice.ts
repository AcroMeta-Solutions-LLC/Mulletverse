import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INFTProps } from "web3uikit";

export type MarketplaceProps = {
  nfts: INFTProps[];
  isLoading: boolean;
  hasError: boolean;
};

type GetNFTProps = {
  address: string;
  chain: string;
  limit: number;
  account: { getNFTs: Function };
};

const initialState: MarketplaceProps = {
  nfts: [],
  isLoading: false,
  hasError: false,
};

export const getNFTs = createAsyncThunk("marketplace/GET_NFTS", async (data: GetNFTProps, thunkAPI) => {
  const response = await data.account.getNFTs({ address: data.address, chain: data.chain, limit: data.limit });
  const nftList: INFTProps[] =
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

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    addNFTList(state: MarketplaceProps, { payload }: { payload: INFTProps[] }) {
      state.nfts = payload;
    },
    clearStore(state: MarketplaceProps) {
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

export const { addNFTList, clearStore } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
