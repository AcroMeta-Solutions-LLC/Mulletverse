import styled from "styled-components";
import { SCREEN } from "../../constants/screen";

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DataSlider = styled.div`
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
