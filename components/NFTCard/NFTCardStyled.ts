import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import { TYPOGRAPHY } from "../../constants/typography";
import ThemeType from "../../types/themeType";

type NFTWrapperType = { width?: string };
type ImageType = { width?: string; src: string; alt: string };

export const NFTWrapper = styled.div<NFTWrapperType>`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  width: ${({ width }) => (width ? width : "260px")};
  min-width: ${({ width }) => (width ? width : "260px")};
  height: 380px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    width: 100%;
    min-width: unset;
  }
`;

export const Image = styled.div<ImageType>`
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
  border-radius: 5px 5px 0 0;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  min-width: ${({ width }) => (width ? `calc(${width} - 2px)` : "230px")};
`;

export const Content = styled.div`
  height: 90px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-size: ${TYPOGRAPHY.SIZE.CAPTION};
`;

export const Collection = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const Actions = styled.div`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  font-weight: 600;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    border-radius: 0;
  }
`;

export const Buy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
