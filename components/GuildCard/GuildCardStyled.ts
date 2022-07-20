import styled from "styled-components";
import { SCREEN } from "../../constants/screen";
import { TYPOGRAPHY } from "../../constants/typography";
import ThemeType from "../../types/themeType";

type ContainerType = { width?: string };
export const Container = styled.div<ContainerType>`
  display: flex;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  padding: 15px 25px;
  border-radius: 10px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  transition: all ease 0.3s;
  max-width: ${({ width }) => (width ? width : "675px")};
  &:hover {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

export const Title = styled.h2`
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_3};
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_3};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  margin-left: 20px;
  border-bottom: 1px dashed transparent;
  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  }
`;

export const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0;
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DataTitle = styled.span`
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const DataLabel = styled.label`
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;
