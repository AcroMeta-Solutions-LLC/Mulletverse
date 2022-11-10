import styled from "styled-components";
import { ELEVATION } from "../../constants/elevation";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

export const Container = styled.footer`
  position: ${({ isFixed }: { isFixed: boolean }) =>
    isFixed ? "fixed" : "static"};
  height: 72px;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: ${ELEVATION.NAVIGATION};
  box-shadow: ${(props) =>
    props.isFixed ? "rgb(4 17 29 / 25%) 0px 0px 8px 0px" : "none"};

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: flex-start;
    height: 100px;
  }
`;

export const Tab = styled.a`
  padding: 0 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  cursor: pointer;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 0 20px 0 0;
  }
`;

export const Redirect = styled.a`
  padding: 0 10px;
  cursor: pointer;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 0 20px 0 0;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;
