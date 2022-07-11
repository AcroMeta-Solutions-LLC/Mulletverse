import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

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

export const Wrapper = styled.div`
  max-width: ${SCREEN.TABLET_SMALL};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 20px 0 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_4};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 250px);
`;

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    margin-left: 0;
    margin-top: 30px;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
  }
`;

export const TokenImage = styled.div`
  background-color: ${({ theme }: { theme: any }) => theme.BACKGROUND};
  background-image: ${(props: { src: string }) => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 380px;
  border-radius: 10px 10px 0 0;
  border: 5px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
  }
`;

export const ImageData = styled.div`
  background-color: ${({ theme }: { theme: any }) => theme.CARD};
  border-radius: 0 0 10px 10px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 100%;
  }
`;

export const ImageDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TokenHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  width: max-content;
  padding: 5px 20px;
  border-radius: 20px;
  max-height: 35px;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Strong = styled.strong`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Label = styled.label`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

type TypeButtonProps = { position: "left" | "right"; isActive: boolean };
export const TypeButton = styled.button<TypeButtonProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, isActive }) => (isActive ? theme.CARD : "transparent")};
  border: 2px solid ${({ theme }) => theme.BORDER};
  cursor: pointer;
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: ${({ position }) => (position === "left" ? "10px 0 0 10px" : "0 10px 10px 0")};
  gap: 10px;
  font-family: inherit;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const Subtitle = styled(Label)`
  margin-top: 15px;
`;

export const Select = styled.select`
  padding: 10px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  border-radius: 5px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  min-width: 100px;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const PriceRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Input = styled.input`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const CalendarSelect = styled.button`
  cursor: pointer;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  margin-top: 15px;
`;

export const FeeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Fee = styled.label`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  font-size: ${TYPOGRAPHY.SIZE.CAPTION};
`;

type CompleteButtonType = { disabled: boolean };
export const CompleteButton = styled.button<CompleteButtonType>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ theme, disabled }) => (disabled ? theme.TEXT : theme.BACKGROUND)};
  background-color: ${({ theme, disabled }) => (disabled ? theme.CARD : theme.PRIMARY)};
  padding: 15px 30px;
  border-radius: 7px;
  border: 2px solid ${({ theme }) => theme.BORDER};
  width: max-content;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.PRIMARY};
  }
`;
