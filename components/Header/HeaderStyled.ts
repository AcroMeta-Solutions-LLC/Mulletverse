import styled from "styled-components";
import { ELEVATION } from "../../constants/elevation";
import { FiSearch, FiMenu } from "react-icons/fi";
import COLORS from "../../constants/colors";
import { SCREEN } from "../../constants/screen";

export const Container = styled.header`
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${ELEVATION.NAVIGATION};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.8);
    height: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "max-content" : "60px")};
  }
`;

export const Search = styled.div`
  border-radius: 5px;
  padding: 10px;
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    width: 35%;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    max-width: unset;
    display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "flex" : "none")};
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  background-color: transparent;
  color: ${COLORS.CLEAR};
`;

export const SearchIcon = styled(FiSearch).attrs({
  color: COLORS.CLEAR,
})``;

export const MenuIcon = styled(FiMenu).attrs({
  color: COLORS.CLEAR,
})`
  align-self: flex-end;
  cursor: pointer;
  display: none;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: block;
  }
`;

export const Tab = styled.a`
  padding: 20px 10px;
  border-bottom: 2px transparent solid;
  color: ${COLORS.CLEAR};
  cursor: pointer;

  &:hover {
    border-bottom: 2px purple solid;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "static" : "none")};
  }
`;
