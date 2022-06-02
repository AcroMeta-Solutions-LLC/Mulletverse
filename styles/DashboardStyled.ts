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

export const Section = styled.section`
  max-width: ${SCREEN.DESKTOP};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 20px;
`;

export const Title = styled.h2`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  align-self: center;
  margin: 45px 0;
`;

export const IncomeTracker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const DataArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    margin-bottom: 50px;
  }
`;

export const DataLabel = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
`;

export const Data = styled.div`
  color: ${({ theme, hasColor }: { theme: ThemeType; hasColor: boolean }) => (hasColor ? "green" : theme.TEXT)};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_2};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  margin-bottom: 30px;
`;

export const ChartArea = styled.div`
  width: 500px;
  height: 300px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
