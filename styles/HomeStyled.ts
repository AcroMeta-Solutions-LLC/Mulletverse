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
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  padding: 0 40px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 0;
    flex-direction: column;
  }
`;

export const Featured = styled.section`
  min-height: 500px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  padding: 0 40px;
`;

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  padding: 30px;
  height: max-content;
  border-top: 2px ${({ theme }: { theme: ThemeType }) => theme.PRIMARY} solid;
  border-bottom: 2px ${({ theme }: { theme: ThemeType }) => theme.PRIMARY} solid;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: max-content;
    align-self: center;
    margin: 10px 0 60px 0;
    padding: 30px 0;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.TITLE};
  margin: 0;
`;

export const AboutDescription = styled.p`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  font-size: ${TYPOGRAPHY.SIZE.SUBTITLE};
  margin: 0;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    font-size: ${TYPOGRAPHY.SIZE.TEXT};
  }
`;

export const AboutCircle = styled.div`
  width: 400px;
  border-radius: 200px;
  background-color: grey;
  margin-top: -170px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.NAVIGATION};
  display: flex;
  justify-content: center;
  padding-top: 40px;

  @media only screen and (max-width: ${SCREEN.TABLET_BIG}) {
    border-radius: 190px;
  }

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding: 0;
    align-self: center;
    margin: 0;
    width: max-content;
  }
`;

export const HeroTitle = styled.h1`
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

export const DesktopOnly = styled.div`
  display: inherit;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    display: inherit;
  }
`;
