import styled from "styled-components";
import { ELEVATION } from "../../constants/elevation";
import { FiSearch, FiMenu } from "react-icons/fi";
import COLORS from "../../constants/colors";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

type HeaderType = {
  isTransparent?: boolean;
  isOpen?: boolean;
};

export const Container = styled.header<HeaderType>`
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  background-color: ${(props) => (props.isTransparent ? "rgba(0, 0, 0, 0.6)" : props.theme?.NAVIGATION)};
  z-index: ${ELEVATION.NAVIGATION};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props) => (props.isTransparent ? "rgba(0, 0, 0, 0.8)" : props.theme?.NAVIGATION)};
    height: ${(props) => (props.isOpen ? "max-content" : "60px")};
  }
`;

export const Search = styled.div<HeaderType>`
  border-radius: 5px;
  padding: 10px;
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    width: 35%;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    max-width: unset;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

export const Input = styled.input<HeaderType>`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  background-color: transparent;
  color: ${(props) => (props.isTransparent ? COLORS.CLEAR : props.theme?.TEXT)};
`;

export const SearchIcon = styled(FiSearch)`
  cursor: pointer;
`;

export const MenuIcon = styled(FiMenu)`
  align-self: flex-end;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: block;
  }
`;

export const Tab = styled.a<HeaderType>`
  padding: 20px 10px;
  border-bottom: 2px transparent solid;
  color: ${(props) => (props.isTransparent ? COLORS.CLEAR : props.theme?.TEXT)};
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    display: ${(props) => (props.isOpen ? "static" : "none")};
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "flex" : "none")};
    flex-direction: row;
  }
`;

export const UserAddress = styled.span<HeaderType>`
  color: ${(props) => (props.isTransparent ? COLORS.CLEAR : props.theme?.TEXT)};
  margin: 0 10px;
  font-weight: 600;
`;
