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
    padding-top: 60px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    flex-direction: column;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 20px 20px 20px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    font-size: ${TYPOGRAPHY.SIZE.HEADLINE_4};
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

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    width: 100%;
    border: none;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export const Collections = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const SearchingFor = styled.span`
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  margin-left: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const SearchingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CollectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Chevron = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  border: none;
  cursor: pointer;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  margin-left: 10px;
  border-radius: 50%;
  padding: 4px 6px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
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
