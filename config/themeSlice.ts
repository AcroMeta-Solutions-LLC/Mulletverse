import { createSlice } from "@reduxjs/toolkit";

export type ThemeProps = {
  isDarkMode: boolean;
};

const initialState: ThemeProps = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state: ThemeProps) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
