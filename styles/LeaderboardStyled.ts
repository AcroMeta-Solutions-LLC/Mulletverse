import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
    padding: 61px 0;
  }
`;

export const Section = styled.section`
  max-width: ${SCREEN.DESKTOP};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  align-self: center;
  margin: 45px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const CollectionImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
`;

export const Header = styled.header`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  flex-direction: row;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

export const TableContainer = styled.div`
  padding: 1rem;
`;
