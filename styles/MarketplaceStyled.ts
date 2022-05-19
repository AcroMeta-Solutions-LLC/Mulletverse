import styled from "styled-components";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0 50px 0;
  display: flex;
  flex-direction: column;
`;

export const TabRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px 24px 0 24px;
`;

export const Tab = styled.a`
  color: ${({ theme, isActive }: { theme: ThemeType; isActive: boolean }) => (isActive ? theme.PRIMARY : theme.TITLE)};
  cursor: pointer;
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_2};
  font-weight: ${({ isActive }: { isActive: boolean }) => (isActive ? 600 : 400)};
  margin-right: 10px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
`;

export const GridSection = styled.section`
  padding: 0 25px;
`;
