import { NextPage } from "next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Checkbox } from "web3uikit";
import { switchTheme } from "../config/themeSlice";
import { Main, Title, Wrapper } from "../styles/SettingsStyled";
import StoreType from "../types/StoreType";

const Settings: NextPage = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((store: StoreType) => store.theme);

  const switchDarkMode = () => {
    dispatch(switchTheme());
  };

  return (
    <Main>
      <Wrapper>
        <Title>Settings</Title>
        <Checkbox layout="switch" checked={isDarkMode} label="Night Mode" name="dark-mode" onChange={switchDarkMode} />
      </Wrapper>
    </Main>
  );
};

export default Settings;
