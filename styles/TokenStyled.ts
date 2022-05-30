import styled from "styled-components";
import COLORS from "../constants/colors";
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

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SkeletonColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  height: 50px;
  justify-content: space-between;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    margin: 10px 0;
    height: 35px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TokenImage = styled.div`
  background-color: ${COLORS.PURPLE.DARK};
  background-image: ${(props: { src: string }) => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 300px;
  height: 400px;
  border-radius: 10px;
`;
