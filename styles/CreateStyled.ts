import styled from "styled-components";
import { SCREEN } from "../constants/screen";
import { TYPOGRAPHY } from "../constants/typography";
import ThemeType from "../types/themeType";

const getDropzoneColor = (props: any) => {
  if (props.isDragAccept) {
    return "blue";
  }
  if (props.isDragReject) {
    return "red";
  }
  if (props.isFocused) {
    return props.theme.PRIMARY;
  }
  return "#eeeeee";
};

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

export const Form = styled.section`
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
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 0 0 20px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Label = styled.label`
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.SUBTITLE_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Small = styled.small`
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
`;

export const Required = styled.span`
  color: red;
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
`;

export const RequiredWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const Dropzone = styled.div`
  display: flex;
  border-width: 3px;
  border-radius: 10px;
  border-color: ${(props) => getDropzoneColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  max-width: 350px;
  height: 250px;
  margin: 15px 0;
`;

export const ImageAsset = styled.div`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 2px 0 15px 0;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  border-radius: 5px;
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  border-radius: 5px;
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  outline-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  margin: 2px 0 15px 0;
  min-height: 110px;
  font-family: inherit;
`;

export const Select = styled.select`
  padding: 10px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  border-radius: 5px;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  margin: 5px 0 15px 0;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const SelectIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
  margin: 5px 0 15px 0;
  &:focus-within {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const SelectIcon = styled.select`
  width: 100%;
  border: none;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  outline: none;
`;

export const Submit = styled.button`
  padding: 10px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  color: #ffffff;
  border-radius: 5px;
  width: 150px;
  border: none;
  margin-top: 15px;
  cursor: pointer;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  display: flex;
  justify-content: center;
`;

export const AttributeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-bottom: 20px;
  justify-content: space-between;
`;

export const Attribute = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  background-color: transparent;
  cursor: pointer;
  padding: 15px;
  border: 2px dashed ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 5px;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const AttributesRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const AttributesNumberRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  align-items: center;
`;

export const TagWrapper = styled.div`
  cursor: pointer;
`;
