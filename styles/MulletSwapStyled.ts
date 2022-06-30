import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";
import { FiChevronDown } from "react-icons/fi";
import COLORS from "../constants/colors";

export const Main = styled.main`
  padding: 73px 0 0 0; //70px 0 50px 0
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 72px);

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-height: calc(100vh - 110px);
  }
`;

export const Container = styled.section`
  /* max-width: ${SCREEN.DESKTOP}; */
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  padding: 0 24px;
  align-self: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const SwapArea = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  justify-content: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 0 20px;
  }

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    flex-direction: column;
  }
`;

export const Swap = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 10px;
  max-width: 330px;
  justify-content: space-between;

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    max-width: unset;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Submit = styled.input.attrs({ type: "submit", value: "Swap" })`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  border: none;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  margin: 20px;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input.attrs({ type: "number" })`
  padding: 10px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  margin: 20px;
  border-radius: 7px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const ChevronDown = styled(FiChevronDown).attrs({
  size: 24,
  color: COLORS.PURPLE,
})`
  align-self: center;
`;

export const SourceHeader = styled.header`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  flex-direction: row;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;
