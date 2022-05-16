import styled from "styled-components";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0 25px 0;
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 25px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const GridSection = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 25px;
`;
