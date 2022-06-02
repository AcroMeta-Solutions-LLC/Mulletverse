import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import ThemeType from "../../types/themeType";

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100vw;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DataSlider = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  position: relative;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 5px 0;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    /* display: none; */
    background-color: transparent;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }: { theme: ThemeType }) => theme.BORDER};
    border-radius: 10px;
  }
`;

export const Chevron = styled.div`
  position: relative;
  background-color: white;
  align-self: center;
  cursor: pointer;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.7;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    min-width: 40px;
    min-height: 40px;
  }
`;
