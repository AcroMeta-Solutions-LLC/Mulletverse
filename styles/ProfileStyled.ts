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
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  margin: 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 250px);
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

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: flex-start;
    margin: 25px 0;
  }
`;

export const Description = styled.p`
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  margin: 5px 0;
  display: flex;
  gap: 10px;
`;

export const ProfileImage = styled.div`
  min-width: 200px;
  width: 200px;
  height: 200px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const CollectionsTab = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreatedTabContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Interests = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;
