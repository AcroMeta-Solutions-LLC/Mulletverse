import { NextPage } from "next";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { CopyButton as CopyWeb3, Loading, Modal, Tag, useNotification } from "web3uikit";
import { INTERESTS } from "../constants/interests";
import { InterestType } from "../types/InterestType";
import {
  IconWrapper,
  Label,
  Main,
  GuildImage,
  GuildImageWrapper,
  RemoveImageButton,
  Section,
  InputIcon,
  InputIconWrapper,
  Submit,
  TextArea,
  TextInput,
  Title,
  Wrapper,
  InterestsWrapper,
  Interest,
  SearchWrapper,
  InterestsLabels,
  Form,
  LoadingWrapper,
  LabelButton,
} from "../styles/GuildStyled";
import { useTheme } from "styled-components";
import { GuildType } from "../types/GuildType";

const Account: NextPage = () => {
  const { user, Moralis } = useMoralis();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [guildImageUrl, setGuildImageUrl] = useState("");
  const [guildImageFile, setGuildImageFile] = useState<File>();
  const [isInterestsModalVisible, setIsInterestsModalVisible] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
  const [search, setSearch] = useState("");
  const [guildName, setGuildName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useNotification();
  const theme: any = useTheme();
  const { save: saveAccount } = useNewMoralisObject("Guilds");
  const [inviteLink, setInviteLink] = useState("");

  const throwError = (errorMessage: string) => {
    alert({ type: "error", title: "Error", message: errorMessage, position: "topR" });
  };

  const getIPFSImageUrl = async (): Promise<string> => {
    setIsLoading(true);
    if (!guildImageFile) return "";
    const file = new Moralis.File(user?.get("ethAddress"), guildImageFile);
    const ipfsResponse = await file.saveIPFS();
    setIsLoading(false);
    return ipfsResponse._url;
  };

  const clearForm = () => {
    setGuildImageUrl("");
    setGuildImageFile(undefined);
    setSelectedInterests([]);
    setGuildName("");
    setBio("");
    setInviteLink("");
  };

  const saveNewGuild = (data: GuildType): void => {
    setIsLoading(true);
    saveAccount(data)
      .then(() => {
        alert({ type: "success", title: "Guild saved successfully.", message: "", position: "topR" });
        clearForm();
      })
      .catch(() => {
        throwError("An error occurred when saving the account.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeImage = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const imageUrl = URL.createObjectURL(target.files[0]);
      setGuildImageFile(target.files[0]);
      setGuildImageUrl(imageUrl);
      target.value = "";
    }
  };

  const onRemoveImage = (): void => {
    setGuildImageFile(undefined);
    setGuildImageUrl("");
  };

  const addOrRemoveInterest = (interest: InterestType): void => {
    const isAlreadySelected: boolean = !!selectedInterests.find((selected) => interest.id === selected.id);
    if (isAlreadySelected) {
      setSelectedInterests(selectedInterests.filter((selected) => interest.id !== selected.id));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const getFilteredInterests = (): InterestType[] => {
    if (!search.trim()) return INTERESTS;
    return INTERESTS.filter((interest) => interest.name.toLowerCase().includes(search.toLowerCase()));
  };

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;
    const imageUrl: string = await getIPFSImageUrl();
    const data: GuildType = {
      address: user?.get("ethAddress"),
      guildName,
      bio,
      interests: selectedInterests,
      inviteLink,
      imageUrl,
    };
    saveNewGuild(data);
  };

  return (
    <Main>
      <Wrapper>
        <Title>Build a Guild</Title>
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={theme.PRIMARY} />
          </LoadingWrapper>
        )}
        <Section>
          <GuildImageWrapper>
            <Label>Guild PFP</Label>
            <GuildImage
              style={{ backgroundImage: `url(${guildImageUrl})` }}
              onClick={() => inputImageRef.current?.click()}
            >
              <IconWrapper>
                <FaCamera color="white" size={24} />
              </IconWrapper>
            </GuildImage>
            {guildImageFile && <RemoveImageButton onClick={onRemoveImage}>Remove image</RemoveImageButton>}
          </GuildImageWrapper>
          <Form onSubmit={onSubmit}>
            <Label htmlFor="name">Guild name</Label>
            <TextInput id="name" value={guildName} onChange={(e) => setGuildName(e.target.value)} type="text" />
            <Label htmlFor="bio">Bio</Label>
            <TextArea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            <LabelButton onClick={() => setIsInterestsModalVisible(true)}>
              Interests
              <FiPlusCircle size={24} />
            </LabelButton>
            <InterestsLabels>
              {selectedInterests.map((interest) => (
                <Tag
                  key={interest.id}
                  hasCancel
                  onCancelClick={() => addOrRemoveInterest(interest)}
                  text={interest.name}
                />
              ))}
            </InterestsLabels>
            <Label htmlFor="link">Invite link</Label>
            <InputIconWrapper style={{ justifyContent: "space-between", padding: "0 10px" }}>
              <TextInput
                style={{ border: "none", outline: "none" }}
                id="link"
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                type="text"
              />
              <CopyWeb3 onCopy={(e) => e?.preventDefault()} text={inviteLink} />
            </InputIconWrapper>
            <Submit value={isLoading ? "Loading..." : "Save"} disabled={isLoading} />
            <input
              onChange={onChangeImage}
              ref={inputImageRef}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
            />
          </Form>
        </Section>
      </Wrapper>
      <Modal
        title="Interests"
        hasFooter={false}
        isVisible={isInterestsModalVisible}
        onCloseButtonPressed={() => setIsInterestsModalVisible(false)}
      >
        <SearchWrapper>
          <FiSearch size={24} />
          <InputIcon value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
        </SearchWrapper>
        <InterestsWrapper>
          {getFilteredInterests().map((interest) => (
            <Interest
              isSelected={!!selectedInterests.find((selected) => interest.id === selected.id)}
              onClick={() => addOrRemoveInterest(interest)}
              key={interest.id}
            >
              {interest.name}
            </Interest>
          ))}
        </InterestsWrapper>
      </Modal>
    </Main>
  );
};

export default Account;
