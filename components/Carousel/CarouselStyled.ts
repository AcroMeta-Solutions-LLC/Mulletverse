import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FeaturedSlider = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding-left: 40px;
  position: relative;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chevron = styled.div`
  position: absolute;
  background-color: white;
  align-self: center;
  right: ${({ position }: { position: "left" | "right" }) => (position === "right" ? "20px" : "unset")};
  left: ${({ position }: { position: "left" | "right" }) => (position === "left" ? "20px" : "unset")};
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.7;
  border: 1px ${({ theme }: { theme: ThemeType }) => theme.TEXT} solid;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 40px;
    height: 40px;
  }
`;
