import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";

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
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  align-self: center;
  margin: 45px 0;
`;

export const CollectionImage = styled.img`
  width: 50px;
  height: 50px;
`;
