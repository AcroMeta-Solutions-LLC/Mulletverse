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

export const getLeaderboard = createAsyncThunk("marketplace/GET_LEADERBOARD", async () => {
  const response = await axios.get("https://api.cryptoslam.io/v1/collections/top-100?timeRange=all");
  return response.data;
});

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
