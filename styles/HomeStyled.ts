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
  text-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  margin-top: 150px;
  font-weight: 700;

  @media only screen and (max-width: 768px) {
    font-size: 32px;
  }
`;
