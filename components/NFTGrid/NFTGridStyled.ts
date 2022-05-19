import styled from "styled-components";
import { SCREEN } from "../../constants/screen";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    justify-content: center;
    align-items: center;
  }
`;

export const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 25px;
  width: 100%;
  flex-wrap: wrap;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    justify-content: center;
    align-items: center;
  }
`;
