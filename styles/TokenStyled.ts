import styled from "styled-components";
import { ELEVATION } from "../constants/elevation";
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
  max-width: ${SCREEN.TABLET_BIG};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 20px 0 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Subtitle = styled.h2`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_4};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_4};
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

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  width: 100%;
  gap: 10px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    margin-left: 0;
    margin-top: 30px;
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
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  cursor: zoom-in;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    width: 95vw;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  padding: 0 15px;
  height: 50px;
  border-radius: 7px;
  cursor: pointer;
  min-width: 110px;
  font-size: ${TYPOGRAPHY.SIZE.CAPTION};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:hover {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

export const ButtonOutline = styled.button`
  background-color: transparent;
  color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  padding: 0 15px;
  height: 50px;
  border-radius: 7px;
  cursor: pointer;
  min-width: 110px;
  font-size: ${TYPOGRAPHY.SIZE.CAPTION};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  gap: 15px;
`;

export const SeeMoreButton = styled(Button)`
  width: 200px;
  margin-top: 20px;
  align-self: center;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const DetailLabel = styled.label`
  margin-right: 20px;
  min-width: 70px;
`;

export const DetailInfo = styled.label`
  word-break: break-all;
`;

export const ChartContainer = styled.section`
  height: 500px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

export const OwnedBy = styled.a`
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  cursor: pointer;
`;

export const OwnedByLabel = styled.span`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
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

type OverlayType = { isVisible: boolean };
export const GlassOverlay = styled.div<OverlayType>`
  background: rgba(87, 85, 85, 0.49);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: ${ELEVATION.NAVIGATION};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
`;

export const ZoomedImage = styled.img`
  height: 80vh;
  border-radius: 10px;
`;
