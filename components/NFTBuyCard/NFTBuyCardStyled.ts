import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

export const NFTWrapper = styled.span`
  max-width: 300px;
  margin-right: 20px;
  border-radius: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};

  height: 370px;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    margin: 0;
    padding: 0;
    width: calc(100vw - 15px);
    max-width: unset;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    background: ${({ theme }: { theme: ThemeType }) =>
      `linear-gradient(${theme.BACKGROUND} 62%, ${theme.NAVIGATION} 60% 100%)`};
  }
`;

export const ButtonNFTBuy = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  border: none;
  align-self: flex-end;
  width: 100%;
  padding: 10px 0;
  border-radius: 0 0 16px 16px;
  cursor: pointer;
  font-weight: 600;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    border-radius: 0;
  }
`;
