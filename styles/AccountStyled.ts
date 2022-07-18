import styled from "styled-components";
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
  max-width: ${SCREEN.TABLET_SMALL};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 20px 0 20px;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    padding-top: 20px;
  }
`;

export const Form = styled.form`
  max-width: 440px;
`;

export const Title = styled.h1`
  font-size: ${TYPOGRAPHY.SIZE.HEADLINE_1};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_1};
  margin: 0 0 20px 0;
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
`;

export const Label = styled.label`
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_2};
  display: flex;
  margin-top: 10px;
`;

export const Description = styled.p`
  font-size: ${TYPOGRAPHY.SIZE.CAPTION};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  margin: 0 0 10px 0;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
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
  min-height: 100px;
  font-family: inherit;
`;

export const Submit = styled.input.attrs({ type: "submit" })`
  padding: 10px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  color: #ffffff;
  border-radius: 5px;
  width: 150px;
  border: none;
  margin-top: 15px;
  cursor: pointer;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
`;

export const InputIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.BORDER};
  border-radius: 5px;
  padding: 10px;
  gap: 10px;
  margin-bottom: 5px;
  &:focus-within {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const InputIcon = styled.input`
  width: 100%;
  border: none;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.BACKGROUND};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-size: ${TYPOGRAPHY.SIZE.BODY_2};
  outline: none;
`;

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  min-width: 200px;
  border-radius: 50%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px dashed ${({ theme }: { theme: ThemeType }) => theme.BORDER};
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-between;

  @media only screen and (max-width: ${SCREEN.TABLET_SMALL}) {
    flex-direction: column-reverse;
  }
`;

export const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

export const RemoveImageButton = styled.button`
  background-color: transparent;
  text-align: left;
  width: max-content;
  border: none;
  padding: 0 0 5px 0;
  cursor: pointer;
  &:hover {
    border-bottom: 1px dotted black;
  }
`;

export const WalletAddress = styled.span`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InterestsLabels = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

export const InterestsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 35px;
`;

type InterestPropType = { isSelected?: boolean };
export const Interest = styled.button<InterestPropType>`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.CARD};
  color: ${({ theme }: { theme: ThemeType }) => theme.TEXT};
  padding: 10px;
  border: 2px solid ${({ theme, isSelected }) => (isSelected ? theme.PRIMARY : theme.BORDER)};
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;

export const SearchWrapper = styled(InputIconWrapper)`
  margin-bottom: 20px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LabelButton = styled.button.attrs({ type: "button" })`
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: ${TYPOGRAPHY.SIZE.BODY_1};
  color: ${({ theme }: { theme: ThemeType }) => theme.TITLE};
  font-weight: ${TYPOGRAPHY.WEIGHT.HEADLINE_2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 110px;
  &:focus {
    outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.PRIMARY};
  }
`;
