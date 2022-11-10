import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ChainType } from "../types/ChainType";
import { NFTResponse } from "../types/NFTResponse";
import NFTType from "../types/NFTType";

export type PortfolioProps = {
  dashboard: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
  };
  collection: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
    total: number;
    previousCursor: string[];
    nextCursor?: string;
    page: number;
    chain: ChainType;
  };
  wishlist: {
    data: NFTType[];
    isLoading: boolean;
    hasError: boolean;
  };
  personal: {
    data: IContractAccountAsset[];
    isLoading: boolean;
    hasError: boolean;
  };
};

type GetNFTProps = {
  cursor?: string | null;
  limit: number;
  chain: string;
  account: { getNFTs: Function };
};

interface IContractAccountAsset {
  contract_address: string;
  token_id: string;
  name: string;
  mint_timestamp: string;
  image_uri: string;
  mint_transaction_hash: string;
}

type FetchWishlistProps = {
  getWishlist: Function;
};

const initialState: PortfolioProps = {
  dashboard: {
    data: [],
    hasError: false,
    isLoading: false,
    total: 0,
    nextCursor: "",
    previousCursor: [""],
    page: 0,
  },
  collection: {
    data: [],
    hasError: false,
    isLoading: false,
    total: 0,
    nextCursor: "",
    previousCursor: [""],
    page: 0,
    chain: "eth",
  },
  wishlist: { data: [], hasError: false, isLoading: false },
  personal: { data: [], hasError: false, isLoading: false },
};

interface IUserData {
  account: string;
  chainId: string;
}

const getNFTList = (list: NFTResponse[], chain: ChainType = "eth"): NFTType[] =>
  list?.map((data: NFTResponse) => ({
    address: data.token_address,
    chain,
    tokenId: data.token_id,
    fetchMetadata: false,
    name: data.name,
    metadata: JSON.parse(data.metadata),
  })) || [];

export const getDashboardNFTs = createAsyncThunk(
  "portfolio/GET_DASHBOARD_NFT",
  async (data: GetNFTProps) => {
    const address = "0x4F5beD793202f22d17CDC3d6eBe538c07A474126";
    const chain = "eth";
    const limit = data.limit;
    const response = await data.account.getNFTs({
      address,
      chain,
      limit,
      cursor: data.cursor,
    });
    const nftList: NFTType[] = getNFTList(response.result);
    return {
      data: nftList,
      previousCursor: data.cursor,
      nextCursor: response.cursor,
      total: response.total,
      page: response.page,
    };
  }
);

export const getCollectionNFTs = createAsyncThunk(
  "portfolio/GET_COLLECTION_NFT",
  async (data: GetNFTProps) => {
    const limit = data.limit;
    const response = await data.account.getNFTs({
      chain: data.chain,
      limit,
      cursor: data.cursor,
    });
    const nftList: NFTType[] = getNFTList(
      response.result,
      data.chain as ChainType
    );
    return {
      data: nftList,
      previousCursor: data.cursor,
      nextCursor: response.cursor,
      total: response.total,
      page: response.page,
    };
  }
);

export const getAccountNFTs = createAsyncThunk(
  "portfolio/GET_ACCOUNT_COLLECTION_NFT",
  async (data: IUserData) => {
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
      `${endpoint}/api/v2/account/own/${data.account}?erc_type=erc721`,
      {
        headers: { "X-API-KEY": apiKey },
      }
    );
    const mapped = response.data.data.content as IContractAccountAsset[];
    return mapped;
  }
);

export const getWishlistNFTs = createAsyncThunk(
  "portfolio/GET_WISHLIST_NFT",
  async (data: FetchWishlistProps) => {
    const wishlist = await data.getWishlist();
    const nft: NFTType[] = wishlist.map((token: { get: Function }) => ({
      address: token.get("token_address"),
      name: token.get("name"),
      tokenId: token.get("token_id"),
      chain: token.get("chain"),
      metadata: {
        name: token.get("metadata").name,
        image: token.get("metadata").image,
        external_url: token.get("metadata").external_url,
        description: token.get("metadata").description,
        attributes: token.get("metadata").attributes,
      },
    }));
    return nft;
  }
);

const setPreviousCursor = (
  cursorList: string[],
  newCursor: string | null | undefined
): string[] => {
  if (newCursor === null || newCursor === undefined) return cursorList;
  let cursors = [...cursorList];
  if (cursors[cursors.length - 2] === newCursor) {
    cursors.splice(-1);
  } else {
    cursors = [...cursors, newCursor];
  }
  return cursors;
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    clearStore(state: PortfolioProps) {
      state.dashboard.data = [];
      state.collection.data = [];
      state.dashboard.nextCursor = "";
      state.dashboard.previousCursor = [""];
      state.dashboard.page = 0;
      state.dashboard.total = 0;
      state.dashboard.hasError = false;
      state.collection.nextCursor = "";
      state.collection.previousCursor = [""];
      state.collection.page = 0;
      state.collection.total = 0;
      state.collection.hasError = false;
    },
    setCollectionChain(
      state: PortfolioProps,
      action: PayloadAction<ChainType>
    ) {
      state.collection.chain = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardNFTs.fulfilled, (state, action) => {
      state.dashboard.data = action.payload.data;
      state.dashboard.isLoading = false;
      state.dashboard.hasError = false;
      state.dashboard.nextCursor = action.payload?.nextCursor || "";
      state.dashboard.total = action.payload.total;
      state.dashboard.page = action.payload.page;
      state.dashboard.previousCursor = setPreviousCursor(
        state.dashboard.previousCursor,
        action.payload?.previousCursor
      );
    });
    builder.addCase(getDashboardNFTs.pending, (state) => {
      state.dashboard.isLoading = true;
    });
    builder.addCase(getDashboardNFTs.rejected, (state) => {
      state.dashboard.isLoading = false;
      state.dashboard.hasError = true;
    });
    builder.addCase(getCollectionNFTs.fulfilled, (state, action) => {
      state.collection.data = action.payload.data;
      state.collection.isLoading = false;
      state.collection.hasError = false;
      state.collection.nextCursor = action.payload?.nextCursor || "";
      state.collection.total = action.payload.total;
      state.collection.page = action.payload.page;
      state.collection.previousCursor = setPreviousCursor(
        state.collection.previousCursor,
        action.payload?.previousCursor
      );
    });
    builder.addCase(getCollectionNFTs.pending, (state) => {
      state.collection.isLoading = true;
    });
    builder.addCase(getCollectionNFTs.rejected, (state) => {
      state.collection.isLoading = false;
      state.collection.hasError = true;
    });
    builder.addCase(getWishlistNFTs.fulfilled, (state, action) => {
      state.wishlist.data = action.payload;
      state.wishlist.isLoading = false;
      state.wishlist.hasError = false;
    });
    builder.addCase(getWishlistNFTs.pending, (state) => {
      state.wishlist.isLoading = true;
    });
    builder.addCase(getWishlistNFTs.rejected, (state) => {
      state.wishlist.isLoading = false;
      state.wishlist.hasError = true;
    });
    builder.addCase(getAccountNFTs.fulfilled, (state, action) => {
      state.personal.data = action.payload;
      state.personal.isLoading = false;
      state.personal.hasError = false;
    });
    builder.addCase(getAccountNFTs.pending, (state) => {
      state.personal.isLoading = true;
    });
    builder.addCase(getAccountNFTs.rejected, (state) => {
      state.personal.isLoading = false;
      state.personal.hasError = true;
    });
  },
});

export const { clearStore, setCollectionChain } = portfolioSlice.actions;

export default portfolioSlice.reducer;
