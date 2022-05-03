import { themeType } from "../types/themeType";
import COLORS from "./colors";

export const LIGHT: themeType = {
  PRIMARY: COLORS.PURPLE.DARK,
  BACKGROUND: COLORS.CLEAR,
  NAVIGATION: COLORS.CLEAR,
  TEXT: COLORS.DARK,
};

const THEME = {
  LIGHT,
};

export const THEME_ENUM = {
  LIGHT: 0,
};

export default THEME;
