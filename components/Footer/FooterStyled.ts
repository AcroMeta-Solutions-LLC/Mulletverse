import styled from "styled-components";
import ThemeType from "../../types/themeType";

export const Container = styled.footer`
  height: 72px;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Tab = styled.a`
  padding: 0 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  cursor: pointer;
`;

export const Redirect = styled.a`
  padding: 0 10px;
  cursor: pointer;
`;

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;
