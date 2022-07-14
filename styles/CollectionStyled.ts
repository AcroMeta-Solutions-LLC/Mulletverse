import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

type FilterType = { isFilterOpen: boolean };

export const Main = styled.main`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
  }
`;

export const Wrapper = styled.div`
  max-width: ${SCREEN.TABLET_BIG};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 20px 0 20px;

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

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: center;
  min-height: calc(100vh - 280px);
`;

export const ImageTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 20px;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const TitleDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CollectionImage = styled.div`
  width: 100%;
  min-width: 300px;
  height: 300px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    margin-top: 10px;
  }
`;

export const ImageContent = styled.div`
  background: rgba(127, 76, 216, 0.7);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Description = styled.p`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  margin: 0;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

type TabButtonType = { isActive?: boolean };
export const TabButton = styled.button<TabButtonType>`
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme, isActive }) => (isActive ? theme.PRIMARY : theme.TITLE)};
  border-bottom: 1px dashed transparent;
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  &:hover {
    border-bottom: 1px dashed ${({ theme }) => theme.PRIMARY};
    color: ${({ theme }) => theme.PRIMARY};
  }
`;

export const CollectionData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    justify-content: flex-start;
    margin: 20px 0;
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-width: unset;
  }
`;

export const DataValue = styled.strong`
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
`;

export const DataLabel = styled.label`
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FilterArea = styled.div<FilterType>`
  border-right: ${({ theme, isFilterOpen }) => (isFilterOpen ? `1px solid ${theme.BORDER}` : "none")};
  background-color: ${({ theme }) => theme.BACKGROUND};
  width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  min-width: ${({ isFilterOpen }) => (isFilterOpen ? "270px" : "0")};
  margin-right: ${({ isFilterOpen }) => (isFilterOpen ? "15px" : "0")};
  transition: all ease 0.3s;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
    border: none;
  }
`;

export const FilterWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 10px;
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
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
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
  padding: 10px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  border-radius: 5px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: transparent;
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
`;

export const FilterLabel = styled.label`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const FilterCheckbox = styled.input`
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  width: 20px;
  height: 20px;
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
`;

export const FilterButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: inherit;
  margin-bottom: 15px;
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
`;

export const FilterIconLabel = styled.strong`
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
  margin-left: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const ActivityFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    flex-direction: column;
  }
`;

export const ChartContainer = styled.div<FilterType>`
  height: 400px;
  width: 100%;
  max-width: ${({ isFilterOpen }) => (isFilterOpen ? "670px" : "unset")};
`;

export const LikeNumber = styled.strong`
  color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
`;
