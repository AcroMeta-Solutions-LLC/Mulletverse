import styled from "styled-components";
import { TYPOGRAPHY } from "../constants/typography";

export const Main = styled.main`
  padding: 70px 25px 25px 25px;
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
`;
