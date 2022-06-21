import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

type ContainerTypeProps = { align?: string };
export const Container = styled.div<ContainerTypeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ align }) => align || "center"};
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
`;

export const CardWrapper = styled.div`
  margin-bottom: 20px;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    margin-bottom: 0;
    width: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 45px;
  width: 100%;
  flex-wrap: wrap;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    justify-content: center;
    align-items: center;
  }
`;

export const PageButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
`;

export const PageNumber = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;
