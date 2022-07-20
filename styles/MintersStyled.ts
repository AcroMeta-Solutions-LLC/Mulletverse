import styled from "styled-components";
import COLORS from "../constants/colors";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Main = styled.main`
  padding: 70px 0 50px 0;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
  }
`;

export const Container = styled.section`
  max-width: ${SCREEN.TABLET_BIG};
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    padding: 0 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
  align-self: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MinterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  gap: 30px;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
  }
`;

export const SeeMore = styled.button`
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    color: ${COLORS.PURPLE_DARK};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MinterButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  align-items: center;
`;

export const MintedAmount = styled.strong`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  margin-top: 15px;
`;

export const NumberToMint = styled.strong`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Description = styled.p`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const MintButton = styled.button`
  color: white;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: all ease 0.3s;
  &:hover {
    background-color: ${COLORS.PURPLE_DARK};
  }
`;

export const IncreaseDecrease = styled.button`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  padding: 7px 13px;
  cursor: pointer;
  border-radius: 5px;
  transition: all ease 0.3s;
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  &:hover {
    border: 2px solid ${COLORS.PURPLE_DARK};
  }
`;

export const Image = styled.img`
  min-width: 130px;
  min-height: 130px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-width: 90px;
    min-height: 90px;
    width: 90px;
    height: 90px;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
