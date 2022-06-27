import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Moralis from "moralis";
import { InterestType } from "../types/InterestType";

export type AccountProps = {
  isLoading: boolean;
  hasError: boolean;
  imageUrl: string;
  username: string;
  bio: string;
  email: string;
  interests: InterestType[];
  twitter: string;
  discord: string;
  instagram: string;
  website: string;
};

const initialState: AccountProps = {
  hasError: false,
  isLoading: false,
  imageUrl: "",
  username: "",
  bio: "",
  email: "",
  interests: [],
  twitter: "",
  discord: "",
  instagram: "",
  website: "",
};

export const getAccount = createAsyncThunk("account/GET_ACCOUNT", async (address: string) => {
  const accounts = new Moralis.Query("Accounts");
  const query = accounts.equalTo("walletAddress", address);
  const response = await query.find();
  const profile = response[0];
  return {
    bio: profile?.get("bio"),
    username: profile?.get("username"),
    imageUrl: profile?.get("imageUrl"),
    email: profile?.get("email"),
  };
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearStore(state: AccountProps) {
      state.bio = "";
      state.imageUrl = "";
      state.email = "";
      state.username = "";
      state.hasError = false;
      state.isLoading = false;
    },
    setAccount(state: AccountProps, { payload }) {
      state.bio = payload.bio;
      state.imageUrl = payload.imageUrl;
      state.email = payload.email;
      state.username = payload.username;
      state.interests = payload.interests;
      state.twitter = payload.twitter;
      state.discord = payload.discord;
      state.instagram = payload.instagram;
      state.website = payload.website;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.bio = action.payload.bio;
      state.imageUrl = action.payload.imageUrl;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(getAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccount.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearStore, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
