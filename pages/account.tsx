import { NextPage } from "next";
import { ChangeEvent, useRef, useState } from "react";
import { FaTwitter, FaDiscord, FaGlobe, FaInstagram, FaCamera, FaPlus } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { CopyButton as CopyWeb3, Modal } from "web3uikit";
import {
  Description,
  IconWrapper,
  Label,
  Main,
  ProfileImage,
  ProfileImageWrapper,
  RemoveImageButton,
  Required,
  Section,
  InputIcon,
  InputIconWrapper,
  Submit,
  TextArea,
  TextInput,
  Title,
  Wrapper,
} from "../styles/AccountStyled";

const Account: NextPage = () => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeImage = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const imageUrl = URL.createObjectURL(target.files[0]);
      setProfileImageFile(target.files[0]);
      setProfileImageUrl(imageUrl);
      target.value = "";
    }
  };

  const onRemoveImage = () => {
    setProfileImageFile(undefined);
    setProfileImageUrl("");
  };

  return (
    <Main>
      <Wrapper>
        <Title>Profile details</Title>
        <Section>
          <form>
            <Label>
              Username<Required>*</Required>
            </Label>
            <TextInput type="text" />
            <Label>
              Bio<Required>*</Required>
            </Label>
            <TextArea />
            <Label>
              Email Address<Required>*</Required>
            </Label>
            <TextInput type="email" />
            <Label>
              Interests
              <FiPlusCircle
                onClick={() => setIsModalVisible(true)}
                style={{ alignSelf: "center", marginLeft: 5, cursor: "pointer" }}
                size={24}
              />
            </Label>
            <Label style={{ marginTop: 30 }}>Social Connections</Label>
            <Description>Help collectors verify your account by connecting Twitter</Description>
            <Label>Links:</Label>
            <InputIconWrapper>
              <FaTwitter size={24} />
              <InputIcon type="text" placeholder="Your Twitter" />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaDiscord size={24} />
              <InputIcon type="text" placeholder="Your Discord" />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaInstagram size={24} />
              <InputIcon type="text" placeholder="Your Instagram handle" />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaGlobe size={24} />
              <InputIcon type="text" placeholder="Your website" />
            </InputIconWrapper>
            <Label>
              Wallet Address<Required>*</Required>
            </Label>
            <InputIconWrapper>
              <InputIcon type="text" />
              <CopyWeb3 onCopy={(e) => e?.preventDefault()} text="" />
            </InputIconWrapper>
            <Submit value="Save" />
            <input
              onChange={onChangeImage}
              ref={inputImageRef}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
            />
          </form>
          <ProfileImageWrapper>
            <Label>Profile Image</Label>
            <ProfileImage
              style={{ backgroundImage: `url(${profileImageUrl})` }}
              onClick={() => inputImageRef.current?.click()}
            >
              <IconWrapper>
                <FaCamera color="white" size={24} />
              </IconWrapper>
            </ProfileImage>
            {profileImageFile && <RemoveImageButton onClick={onRemoveImage}>Remove image</RemoveImageButton>}
          </ProfileImageWrapper>
        </Section>
      </Wrapper>
      <Modal
        title="Interests"
        hasFooter={false}
        isVisible={isModalVisible}
        onCloseButtonPressed={() => setIsModalVisible(false)}
      >
        <p>Interests - TO DO</p>
      </Modal>
    </Main>
  );
};

export default Account;
