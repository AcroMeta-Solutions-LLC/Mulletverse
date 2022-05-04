import styled from "styled-components";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

export const Hero = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("/assets/major-mullet.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HERO};
  color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  margin-top: 150px;

  position: relative;
  background-image: -webkit-linear-gradient(
    #378dbc 0%,
    #ffffff 46%,
    #ffffff 50%,
    #32120e 54%,
    #5d2463 58%,
    #5d2463 90%,
    #5d2463 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-filter: drop-shadow(2px 2px 15px #5d2463);
  filter: drop-shadow(2px 2px 15px #5d2463);
  -webkit-text-stroke: 2px #f5f5f5;

  &:before {
    content: "MULLETVERSE";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background-image: -webkit-linear-gradient(
      -40deg,
      transparent 0%,
      transparent 40%,
      #fff 50%,
      transparent 60%,
      transparent 100%
    );
    background-position: -680px 0;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-stroke: 0;
    padding-right: 300px;
    animation-name: chrome_effect;
    -webkit-animation-name: chrome_effect;
    animation-duration: 4s;
    -webkit-animation-duration: 4s;
    animation-delay: 2s;
    -webkit-animation-delay: 2s;
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }

  @keyframes chrome_effect {
    0% {
      background-position: -680px 0;
    }
    10% {
      background-position: 420px 0;
    }
    100% {
      background-position: 420px 0;
    }
  }

  @media only screen and (max-width: 768px) {
    font-size: 56px;
  }
`;
