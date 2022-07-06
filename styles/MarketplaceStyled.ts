import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

type FilterType = { isFilterOpen: boolean };

export const Main = styled.main`
  padding: 70px 0 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 60px;
  }
`;

export const Container = styled.div`
  max-width: ${SCREEN.DESKTOP};
  display: flex;
  flex-direction: column;
  align-self: center;
  min-height: calc(100vh - 280px);
  width: 100%;
  padding-top: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 300px);
  }
`;

export const Header = styled.header`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  flex-direction: row;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

export const TabRow = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Tab = styled.a`
  color: ${({ theme, isActive }: { theme: ThemeType; isActive: boolean }) => (isActive ? theme.PRIMARY : theme.TITLE)};
  cursor: pointer;
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${({ isActive }: { isActive: boolean }) => (isActive ? 600 : 400)};
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
  align-self: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const GridSection = styled.section`
  padding: 0 20px;
`;

export const FilterButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: inherit;
`;

export const FilterIconLabel = styled.strong`
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
  margin-left: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const FilterContainer = styled.div<FilterType>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isFilterOpen }) => (isFilterOpen ? "flex-start" : "center")};

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    flex-direction: column;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const FilterArea = styled.div<FilterType>`
  border-right: ${({ theme, isFilterOpen }) => (isFilterOpen ? `1px solid ${theme.BORDER}` : "none")};
  background-color: ${({ theme }) => theme.BACKGROUND};
  width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  min-width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  margin-right: ${({ isFilterOpen }) => (isFilterOpen ? "15px" : "0")};
  transition: all ease 0.3s;

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    width: 100%;
    border: none;
  }
`;

export const FilterWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const FilterTitle = styled.h2`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
  margin-bottom: 10px;
`;

export const FilterInput = styled.input`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: transparent;
`;

export const FilterPriceRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const FilterApply = styled.input`
  color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
  border: none;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FilterSelect = styled.select`
  padding: 10px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  border-radius: 5px;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: transparent;
`;

export const FilterLabel = styled.label`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const FilterCheckbox = styled.input`
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  width: 20px;
  height: 20px;
`;
