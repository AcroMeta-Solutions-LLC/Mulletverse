import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import { TYPOGRAPHY } from "../../constants/typography";
import ThemeType from "../../types/themeType";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const IncomeTracker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

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

export const BuyAndSellWrapper = styled.div`
  margin-top: 20px;
`;
