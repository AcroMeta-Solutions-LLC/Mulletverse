import styled from "styled-components";
import { SCREEN } from "../constants/screen";
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

export const About = styled.section`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HERO};
  color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  margin-top: 150px;
  background-image: -webkit-linear-gradient(#5d2463 25%, #ffffff, #5d2463);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-filter: drop-shadow(2px 2px 15px #5d2463);
  filter: drop-shadow(2px 2px 15px #5d2463);
  font-style: italic;
  width: 100%;
  text-align: center;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    font-size: 56px;
  }

  @media only screen and (max-width: ${SCREEN.MOBILE}) {
    font-size: 38px;
  }
`;
