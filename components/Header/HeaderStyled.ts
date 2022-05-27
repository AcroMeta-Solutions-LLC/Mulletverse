import styled from "styled-components";
import { ELEVATION } from "../../constants/elevation";
import { FiSearch, FiMenu } from "react-icons/fi";
import COLORS from "../../constants/colors";
import { SCREEN } from "../../constants/screen";

type HeaderType = {
  isLandingPage?: boolean;
  isOpen?: boolean;
};

type DropdownAreaType = {
  isLandingPage?: boolean;
  isOpen?: boolean;
  position: "left" | "right";
};

export const Container = styled.header<HeaderType>`
  height: 72px;
  position: ${(props) => (props.isLandingPage ? "absolute" : "fixed")};
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  background-color: ${(props) => (props.isLandingPage ? "rgba(0, 0, 0, 0.1)" : props.theme?.NAVIGATION)};
  z-index: ${ELEVATION.NAVIGATION};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props) => (props.isLandingPage ? "rgba(0, 0, 0, 0.8)" : props.theme?.NAVIGATION)};
    height: ${(props) => (props.isOpen ? "max-content" : "60px")};
  }
`;

export const Search = styled.div<HeaderType>`
  border-radius: 5px;
  padding: 10px;
  width: 80%;
  max-width: 350px;
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
  color: ${(props) => (props.isLandingPage ? COLORS.CLEAR : props.theme?.TEXT)};
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
  color: ${(props) => (props.isLandingPage ? COLORS.CLEAR : props.theme?.TEXT)};
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    display: ${(props) => (props.isOpen ? "static" : "none")};
  }
`;

export const Dropdown = styled.div<HeaderType>`
  position: relative;
  padding: 20px 5px;
  color: ${(props) => (props.isLandingPage ? COLORS.CLEAR : props.theme?.TEXT)};
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: ${(props) => (props.isOpen ? "relative" : "none")};
  }
`;

export const DropdownLabel = styled.span<HeaderType>`
  margin-right: 10px;
  color: ${(props) => (props.isLandingPage ? COLORS.CLEAR : props.theme?.TEXT)};
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  display: flex;
  align-items: center;
  display: relative;
  &:hover {
    font-weight: 600;
  }
`;

export const DropdownArea = styled.ul<DropdownAreaType>`
  position: absolute;
  box-shadow: ${(props) => (props.isLandingPage ? "none" : "rgb(4 17 29 / 25%) 0px 4px 8px 0px")};
  background-color: ${(props) => (props.isLandingPage ? "rgba(0, 0, 0, 0.5)" : props.theme?.NAVIGATION)};
  padding: 10px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 200px;
  top: 55px;
  left: ${(props) => (props.position === "left" ? "-15px" : "unset")};
  right: ${(props) => (props.position === "right" ? "-15px" : "unset")};
  list-style-type: none;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    position: relative;
    width: 100%;
    padding: 0;
    box-shadow: none;
    top: 0;
    left: 8px;
  }
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 5px 0;
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
  color: ${(props) => (props.isLandingPage ? COLORS.CLEAR : props.theme?.TEXT)};
  margin: 0 10px;
`;
