import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

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
  justify-content: center;
  align-items: center;
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

export const PageButton = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  border: 1px ${({ theme }: { theme: ThemeType }) => theme.TITLE} solid;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
`;