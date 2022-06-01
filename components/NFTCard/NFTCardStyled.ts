import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

export const NFTWrapper = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  width: 230px;
  min-width: 230px;
  height: 330px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
    margin-top: -10px;
  }

  &:active {
    margin-top: 0px;
  }

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    border-radius: 0;
    width: 100vw;
    min-width: unset;
  }
`;

export const Image = styled.div`
  background-image: ${({ src }: { src: string; alt: string }) => `url(${src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
  border-radius: 5px 5px 0 0;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  min-width: 230px;
`;

export const Content = styled.div`
  height: 90px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 10px;
`;

export const Title = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const ButtonBuy = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  border: none;
  align-self: flex-end;
  width: 100%;
  padding: 10px 0;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  font-weight: 600;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    border-radius: 0;
  }
`;
