import styled from "styled-components";
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
`;

export const ButtonNFTBuy = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  border: none;
  align-self: flex-end;
  width: 100%;
  padding: 10px 0;
  border-radius: 0 0 16px 16px;
  cursor: pointer;
  font-weight: 600;
`;
