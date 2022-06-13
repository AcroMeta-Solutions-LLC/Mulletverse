import { useSelector } from "react-redux";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import THEME from "../../constants/theme";
import StoreType from "../../types/StoreType";
import ThemeType from "../../types/themeType";

type ConnectedThemeType = {
  children: any;
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  }
`;

const ConnectedTheme = ({ children }: ConnectedThemeType) => {
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);
  return (
    <ThemeProvider theme={isDarkMode ? THEME.DARK : THEME.LIGHT}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default ConnectedTheme;
