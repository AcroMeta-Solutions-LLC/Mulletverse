import { NextPage } from "next";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaTwitter, FaDiscord, FaGlobe, FaInstagram, FaCamera } from "react-icons/fa";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { CopyButton as CopyWeb3, Loading, Modal, Tag, useNotification } from "web3uikit";
import { INTERESTS } from "../constants/interests";
import { InterestType } from "../types/InterestType";
import { ProfileType } from "../types/ProfileType";
import Moralis from "moralis/types";
import COLORS from "../constants/colors";
import {
  Description,
  IconWrapper,
  Label,
  Main,
  ProfileImage,
  ProfileImageWrapper,
  RemoveImageButton,
  Section,
  InputIcon,
  InputIconWrapper,
  Submit,
  TextArea,
  TextInput,
  Title,
  Wrapper,
  WalletAddress,
  InterestsWrapper,
  Interest,
  SearchWrapper,
  InterestsLabels,
  Form,
  LoadingWrapper,
} from "../styles/AccountStyled";
import { useDispatch } from "react-redux";
import { setImageUrl } from "../config/profileSlice";

const Account: NextPage = () => {
  const { user, isInitialized, Moralis } = useMoralis();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useNotification();
  const dispatch = useDispatch();
  const [accountMoralisObj, setAccountMoralisObj] = useState<Moralis.Object<Moralis.Attributes> | undefined>();
  const { save: saveAccount } = useNewMoralisObject("Accounts");

  const throwError = (errorMessage: string) => {
    alert({ type: "error", title: errorMessage, message: "", position: "topR" });
  };

  const getIPFSImageUrl = async (): Promise<string> => {
    setIsLoading(true);
    if (!profileImageFile) return "";
    const file = new Moralis.File(user?.get("ethAddress"), profileImageFile);
    const ipfsResponse = await file.saveIPFS();
    setIsLoading(false);
    return ipfsResponse._url;
  };

  const fetchAccount = async (): Promise<Moralis.Object<Moralis.Attributes>> => {
    const accounts = new Moralis.Query("Accounts");
    const query = accounts.equalTo("walletAddress", user?.get("ethAddress"));
    const response = await query.find();
    return response[0];
  };

  const updateAccount = async (data: ProfileType): Promise<void> => {
    if (!accountMoralisObj) return;
    setIsLoading(true);
    accountMoralisObj.set("bio", data.bio);
    accountMoralisObj.set("discord", data.discord);
    accountMoralisObj.set("email", data.email);
    accountMoralisObj.set("imageUrl", data.imageUrl);
    accountMoralisObj.set("instagram", data.instagram);
    accountMoralisObj.set("interests", data.interests);
    accountMoralisObj.set("twitter", data.twitter);
    accountMoralisObj.set("username", data.username);
    accountMoralisObj.set("website", data.website);
    accountMoralisObj
      .save()
      .then(() => {
        alert({ type: "success", title: "Account updated successfully.", message: "", position: "topR" });
      })
      .catch(() => {
        throwError("An error occurred when updating the account.");
      })
      .finally(() => setIsLoading(false));
  };

  const saveNewAccount = (data: ProfileType): void => {
    setIsLoading(true);
    saveAccount(data)
      .then(() => {
        alert({ type: "success", title: "Account saved successfully.", message: "", position: "topR" });
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
      setProfileImageFile(target.files[0]);
      setProfileImageUrl(imageUrl);
      target.value = "";
    }
  };

  const onRemoveImage = (): void => {
    setProfileImageFile(undefined);
    setProfileImageUrl("");
  };

  const onAddOrRemoveInterest = (interest: InterestType): void => {
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
    const data: ProfileType = {
      walletAddress: user?.get("ethAddress"),
      username,
      bio,
      email,
      interests: selectedInterests,
      twitter,
      discord,
      instagram,
      website,
      imageUrl,
    };
    dispatch(setImageUrl(imageUrl || profileImageUrl || ""));
    if (accountMoralisObj) {
      updateAccount(data);
    } else {
      saveNewAccount(data);
    }
  };

  useEffect(() => {
    if (isInitialized && user) {
      setIsLoading(true);
      fetchAccount()
        .then((moralisObject) => {
          if (!moralisObject) return;
          setAccountMoralisObj(moralisObject);
          setUsername(moralisObject.get("username"));
          setBio(moralisObject.get("bio"));
          setEmail(moralisObject.get("email"));
          setTwitter(moralisObject.get("twitter"));
          setDiscord(moralisObject.get("discord"));
          setInstagram(moralisObject.get("instagram"));
          setWebsite(moralisObject.get("website"));
          setSelectedInterests(moralisObject.get("interests"));
          setProfileImageUrl(moralisObject.get("imageUrl"));
        })
        .catch(() => {
          throwError("An error occurred when fetching the account data.");
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, user]);

  return (
    <Main>
      <Wrapper>
        <Title>Profile details</Title>
        {isLoading && (
          <LoadingWrapper>
            <Loading spinnerColor={COLORS.PURPLE} />
          </LoadingWrapper>
        )}
        <Section>
          <Form onSubmit={onSubmit}>
            <Label>Username</Label>
            <TextInput value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
            <Label>Bio</Label>
            <TextArea value={bio} onChange={(e) => setBio(e.target.value)} />
            <Label>Email Address</Label>
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label>
              Interests
              <FiPlusCircle
                onClick={() => setIsModalVisible(true)}
                style={{ alignSelf: "center", marginLeft: 5, cursor: "pointer" }}
                size={24}
              />
            </Label>
            <InterestsLabels>
              {selectedInterests.map((interest) => (
                <Tag
                  key={interest.id}
                  hasCancel
                  onCancelClick={() => onAddOrRemoveInterest(interest)}
                  text={interest.name}
                />
              ))}
            </InterestsLabels>
            <Label style={{ marginTop: 30 }}>Social Connections</Label>
            <Description>Help collectors verify your account by connecting Twitter</Description>
            <Label>Links:</Label>
            <InputIconWrapper>
              <FaTwitter size={24} />
              <InputIcon
                type="text"
                placeholder="Your Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaDiscord size={24} />
              <InputIcon
                type="text"
                placeholder="Your Discord"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaInstagram size={24} />
              <InputIcon
                type="text"
                placeholder="Your Instagram handle"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </InputIconWrapper>
            <InputIconWrapper>
              <FaGlobe size={24} />
              <InputIcon
                type="text"
                placeholder="Your website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </InputIconWrapper>
            <Label style={{ marginTop: 30 }}>Wallet Address</Label>
            <InputIconWrapper>
              <WalletAddress>{user?.get("ethAddress")}</WalletAddress>
              <CopyWeb3 onCopy={(e) => e?.preventDefault()} text={user?.get("ethAddress")} />
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
        <SearchWrapper>
          <FiSearch size={24} />
          <InputIcon value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
        </SearchWrapper>
        <InterestsWrapper>
          {getFilteredInterests().map((interest) => (
            <Interest
              isSelected={!!selectedInterests.find((selected) => interest.id === selected.id)}
              onClick={() => onAddOrRemoveInterest(interest)}
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
