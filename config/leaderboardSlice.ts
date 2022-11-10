import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LeaderboardType } from "../types/LeaderboardType";

export type LeaderboardProps = {
  data: LeaderboardType[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: LeaderboardProps = {
  data: [],
  hasError: false,
  isLoading: false,
};

interface ILeaderboard {
  account: string;
  chainId: string;
}

export const getLeaderboard = createAsyncThunk(
  "marketplace/GET_LEADERBOARD",
  async (data: ILeaderboard) => {
    const apiKey = process.env.NEXT_PUBLIC_NFTSCAN_KEY || "";
    const endpoint =
      data.chainId === "0x1"
        ? "https://restapi.nftscan.com"
        : data.chainId === "0x38"
        ? "https://bnbapi.nftscan.com"
        : data.chainId === "0x89"
        ? "https://polygonapi.nftscan.com"
        : "https://polygonapi.nftscan.com";
    const response = await axios.get(
      `${endpoint}/api/v2/account/own/all/${data.account}`,
      {
        headers: { "X-API-KEY": apiKey },
      }
    );
    return response.data.data;
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    clearStore(state: LeaderboardProps) {
      state.data = [];
      state.hasError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getLeaderboard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLeaderboard.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearStore } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
