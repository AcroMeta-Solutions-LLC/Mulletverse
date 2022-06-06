import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0 50px 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
  }
`;

export const Container = styled.div`
  max-width: ${SCREEN.DESKTOP};
  display: flex;
  flex-direction: column;
`;

export const GridSection = styled.section`
  padding: 0 25px;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    padding: 0;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
  align-self: center;
`;

export const Filters = styled.header`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
`;
