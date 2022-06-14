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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 0 0 20px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Filters = styled.header`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
`;

export const FilterButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

type FilterType = { isFilterOpen: boolean };

export const FilterArea = styled.div<FilterType>`
  border-right: ${({ theme, isFilterOpen }) => (isFilterOpen ? `1px solid ${theme.BORDER}` : "none")};
  background-color: ${({ theme }) => theme.BACKGROUND};
  width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  min-width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  margin-right: ${({ isFilterOpen }) => (isFilterOpen ? "15px" : "0")};
  transition: all ease 0.3s;
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const SearchingFor = styled.span`
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  margin-left: 20px;
`;

export const SearchingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
