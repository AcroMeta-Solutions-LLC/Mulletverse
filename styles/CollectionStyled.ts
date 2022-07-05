import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

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
  max-width: 300px;
  height: 300px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    max-width: unset;
    margin-top: 10px;
  }
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
