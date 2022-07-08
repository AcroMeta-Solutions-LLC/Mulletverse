import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "styled-components";
import { Checkbox, Icon, Loading, Modal, Tag, useNotification } from "web3uikit";
import { FaPlus } from "react-icons/fa";
import { INTERESTS } from "../constants/interests";
import {
  Main,
  Title,
  Form,
  Label,
  Small,
  Required,
  RequiredWrapper,
  Dropzone,
  ImageAsset,
  TextInput,
  TextArea,
  Select,
  SelectIconWrapper,
  SelectIcon,
  Submit,
  AttributeWrapper,
  Attribute,
  PlusButton,
  AttributesRow,
  AttributesNumberRow,
  TagWrapper,
} from "../styles/CreateStyled";
import { CONTENT_TYPE } from "../constants/contentType";
import { useMoralis } from "react-moralis";

type BlockchainType = "eth" | "matic" | "bnb" | "solana";
type AttributeType = { name: string; value: string };
type TagType = { id: string; name: string };

const Create: NextPage = () => {
  const { isInitialized, user, Moralis } = useMoralis();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [isModalPropertiesOpen, setIsModalPropertiesOpen] = useState(false);
  const [isModalLevelsOpen, setIsModalLevelsOpen] = useState(false);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState(false);
  const [isModalTagsOpen, setIsModalTagsOpen] = useState(false);
  const [blockchain, setBlockchain] = useState<BlockchainType>("eth");
  const theme: any = useTheme();
  const [properties, setProperties] = useState<AttributeType[]>([]);
  const [levels, setLevels] = useState<AttributeType[]>([]);
  const [stats, setStats] = useState<AttributeType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [levelName, setLevelName] = useState("");
  const [levelValueStart, setLevelValueStart] = useState(1);
  const [levelValueEnd, setLevelValueEnd] = useState(1);
  const [statName, setStatName] = useState("");
  const [statValueStart, setStatValueStart] = useState(1);
  const [statValueEnd, setStatValueEnd] = useState(1);
  const [newTag, setNewTag] = useState("");
  const [contentType, setContentType] = useState("");
  const [supply, setSupply] = useState(1);
  const [externalLink, setExternalLink] = useState("");
  const [isSensitive, setIsSensitive] = useState(false);
  const [isUnlockable, setIsUnlockable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useNotification();

  const onAddfiles = useCallback((acceptedFiles: File[]) => {
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setImageUrl(imageUrl);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 1000000,
    onDrop: onAddfiles,
  });

  const toogleTag = (tag: TagType): void => {
    const isAlreadySelected = !!tags.find((t) => t.id === tag.id);
    if (isAlreadySelected) {
      setTags(tags.filter((t) => t.id !== tag.id));
    } else {
      setTags([...tags, tag]);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setFile(undefined);
    setProperties([]);
    setLevels([]);
    setStats([]);
    setTags([]);
    setContentType("");
    setExternalLink("");
    setIsSensitive(false);
    setIsUnlockable(false);
  };

  useEffect(() => {
    Moralis.enableWeb3();
  }, [Moralis]);

  const submitForm = async (): Promise<void> => {
    if (!isInitialized || !user || isLoading) return;
    if (!file || !name) {
      alert({
        type: "warning",
        title: "Fields missing",
        message: "Please fill in all required fields",
        position: "topR",
      });
      return;
    }
    setIsLoading(true);
    const nftFile: any = new Moralis.File(file.name.replace(/[^\w\s]/gi, ""), file);
    await nftFile.saveIPFS();
    const imageHash = nftFile.hash();
    const metadata = {
      name,
      contentType,
      externalLink,
      description,
      image: "/ipfs/" + imageHash,
      properties,
      levels,
      stats,
      tags,
      isSensitive,
      isUnlockable,
    };
    const jsonFile: any = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
    await jsonFile.saveIPFS();
    const metadataHash = jsonFile.hash();
    try {
      const { data } = await Moralis.Plugins.rarible.lazyMint({
        chain: "eth",
        userAddress: user.get("ethAddress"),
        tokenType: "ERC721",
        tokenUri: "/ipfs/" + metadataHash,
        royaltiesAmount: 25,
        supply,
      });
      alert({ type: "success", title: "NFT Created!", message: "Opening new tab...", position: "topR" });
      clearForm();
      const { tokenAddress, tokenId } = data.result;
      window.open(`https://rarible.com/token/${tokenAddress}:${tokenId}`, "_blank")?.focus();
    } catch (error: any) {
      alert({ type: "error", title: error.name, message: error.message, position: "topR" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Main>
      <Form>
        <Title>Create New Item</Title>
        <RequiredWrapper>
          <Label htmlFor="image">Image</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <Small>File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</Small>
        <Dropzone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input id="image" {...getInputProps()} />
          <ImageAsset style={{ backgroundImage: `url(${imageUrl})` }}>
            {!imageUrl && <p>Drag and drop, or click to select</p>}
          </ImageAsset>
        </Dropzone>
        <RequiredWrapper>
          <Label htmlFor="nft-name">Name</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput
          type="text"
          id="nft-name"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="content-type">Content Type</Label>
        <SelectIconWrapper>
          <Icon fill={theme.PRIMARY} size={20} svg="file" />
          <SelectIcon value={contentType} id="content-type" onChange={(e) => setContentType(e.target.value)}>
            {CONTENT_TYPE.map((content) => (
              <option key={content.id} value={content.id}>
                {content.name}
              </option>
            ))}
          </SelectIcon>
        </SelectIconWrapper>
        <Label htmlFor="external-link">External link</Label>
        <TextInput
          type="text"
          id="external-link"
          placeholder="http://website.com/item/123"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
        />
        <Label htmlFor="description">Description</Label>
        <Small>The description provided will be included on the item`s details page.</Small>
        <TextArea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label htmlFor="collection">Collection</Label>
        <Small>This is the collection where your item will appear.</Small>
        <Select style={{ backgroundColor: theme.CARD }} disabled></Select>
        <AttributeWrapper style={{ alignItems: "center" }}>
          <Attribute>
            <Label htmlFor="properties-btn">Properties</Label>
            <Small>Textual traits that show up as rectangles.</Small>
          </Attribute>
          <PlusButton id="properties-btn" onClick={() => setIsModalPropertiesOpen(true)}>
            <FaPlus size={20} />
          </PlusButton>
        </AttributeWrapper>
        <AttributesRow>
          {properties.map((property) => (
            <Tag
              key={property.name}
              hasCancel
              onCancelClick={() => setProperties(properties.filter((p) => p.name !== property.name))}
              text={`${property.name.toUpperCase()}: ${property.value}`}
            />
          ))}
        </AttributesRow>
        <AttributeWrapper style={{ alignItems: "center" }}>
          <Attribute>
            <Label htmlFor="levels-btn">Levels</Label>
            <Small>Numerical traits that show as a progress bar.</Small>
          </Attribute>
          <PlusButton id="levels-btn" onClick={() => setIsModalLevelsOpen(true)}>
            <FaPlus size={20} />
          </PlusButton>
        </AttributeWrapper>
        <AttributesRow>
          {levels.map((level) => (
            <Tag
              key={level.name}
              hasCancel
              onCancelClick={() => setLevels(levels.filter((p) => p.name !== level.name))}
              text={`${level.name.toUpperCase()}: ${level.value}`}
            />
          ))}
        </AttributesRow>
        <AttributeWrapper style={{ alignItems: "center" }}>
          <Attribute>
            <Label htmlFor="stats-btn">Stats</Label>
            <Small>Numerical traits that just show as numbers.</Small>
          </Attribute>
          <PlusButton id="stats-btn" onClick={() => setIsModalStatsOpen(true)}>
            <FaPlus size={20} />
          </PlusButton>
        </AttributeWrapper>
        <AttributesRow>
          {stats.map((stat) => (
            <Tag
              key={stat.name}
              hasCancel
              onCancelClick={() => setStats(stats.filter((p) => p.name !== stat.name))}
              text={`${stat.name.toUpperCase()}: ${stat.value}`}
            />
          ))}
        </AttributesRow>
        <AttributeWrapper style={{ alignItems: "center" }}>
          <Attribute>
            <Label htmlFor="tags-btn">Tags</Label>
            <Small>Identifiers for your creation.</Small>
          </Attribute>
          <PlusButton id="tags-btn" onClick={() => setIsModalTagsOpen(true)}>
            <FaPlus size={20} />
          </PlusButton>
        </AttributeWrapper>
        <AttributesRow>
          {tags.map((tag) => (
            <Tag
              key={tag.name}
              hasCancel
              onCancelClick={() => setTags(tags.filter((t) => t.id !== tag.id))}
              text={tag.name}
            />
          ))}
        </AttributesRow>
        <AttributeWrapper>
          <Attribute>
            <Label htmlFor="unlockable-content">Unlockable Content</Label>
            <Small>Include unlockable content that can only be revealed by the owner of the item.</Small>
          </Attribute>
          <Checkbox
            layout="switch"
            checked={isUnlockable}
            label=""
            id="unlockable-content"
            name="unlockable-content"
            onChange={(e) => {
              setIsUnlockable(e.target.value !== "true");
            }}
          />
        </AttributeWrapper>
        <AttributeWrapper>
          <Attribute>
            <Label htmlFor="explicit">Explicit & Sensitive Content</Label>
            <Small>
              Contains explicit content including, drugs, alcohol, adult content, profanity, and/or violence.
            </Small>
          </Attribute>
          <Checkbox
            layout="switch"
            checked={isSensitive}
            label=""
            id="explicit"
            name="explicit"
            onChange={(e) => {
              setIsSensitive(e.target.value !== "true");
            }}
          />
        </AttributeWrapper>
        <Label htmlFor="supply">Supply</Label>
        <Small>The number of items that can be minted.</Small>
        <TextInput
          type="number"
          id="supply"
          min={1}
          value={supply}
          onChange={(e) => setSupply(parseInt(e.target.value))}
          disabled
          style={{ backgroundColor: theme.CARD }}
        />
        <Label htmlFor="blockchain">Blockchain</Label>
        <SelectIconWrapper style={{ backgroundColor: theme.CARD }}>
          <Icon fill={theme.PRIMARY} size={20} svg={blockchain as any} />
          <SelectIcon
            style={{ backgroundColor: theme.CARD }}
            value={blockchain}
            id="blockchain"
            onChange={(e) => setBlockchain(e.target.value as BlockchainType)}
            disabled
          >
            <option value="eth">Ethereum</option>
            <option value="matic">Polygon</option>
            <option value="bnb">Binance</option>
          </SelectIcon>
        </SelectIconWrapper>
        <Submit disabled={isLoading} type="button" onClick={submitForm}>
          {isLoading ? <Loading spinnerColor={theme.CARD} /> : "Create"}
        </Submit>
      </Form>
      <Modal
        width="400px"
        title="Properties"
        okButtonColor={theme.PRIMARY}
        isVisible={isModalPropertiesOpen}
        okText="Save"
        onCancel={() => setIsModalPropertiesOpen(false)}
        onCloseButtonPressed={() => setIsModalPropertiesOpen(false)}
        isOkDisabled={!propertyName.trim() || !propertyValue.trim()}
        onOk={() => {
          setProperties([...properties, { name: propertyName, value: propertyValue }]);
          setPropertyName("");
          setPropertyValue("");
        }}
      >
        <RequiredWrapper>
          <Label htmlFor="property-name">Name</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput id="property-name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
        <RequiredWrapper>
          <Label htmlFor="property-value">Value</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput id="property-value" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} />
      </Modal>
      <Modal
        width="400px"
        title="Levels"
        isVisible={isModalLevelsOpen}
        onCloseButtonPressed={() => setIsModalLevelsOpen(false)}
        okButtonColor={theme.PRIMARY}
        okText="Save"
        onCancel={() => setIsModalLevelsOpen(false)}
        isOkDisabled={!levelName.trim() || levelValueStart == 0 || levelValueEnd == 0}
        onOk={() => {
          setLevels([...levels, { name: levelName, value: `${levelValueStart} of ${levelValueEnd}` }]);
          setLevelName("");
          setLevelValueStart(1);
          setLevelValueEnd(1);
        }}
      >
        <RequiredWrapper>
          <Label htmlFor="level-name">Name</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput id="level-name" value={levelName} onChange={(e) => setLevelName(e.target.value)} />
        <RequiredWrapper>
          <Label htmlFor="level-value">Value</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <AttributesNumberRow>
          <TextInput
            type="number"
            id="level-value"
            value={levelValueStart}
            min={1}
            onChange={(e) => setLevelValueStart(parseInt(e.target.value))}
          />
          <Label htmlFor="level-of">of</Label>
          <TextInput
            type="number"
            min={1}
            id="level-of"
            value={levelValueEnd}
            onChange={(e) => setLevelValueEnd(parseInt(e.target.value))}
          />
        </AttributesNumberRow>
      </Modal>
      <Modal
        width="400px"
        title="Stats"
        isVisible={isModalStatsOpen}
        onCloseButtonPressed={() => setIsModalStatsOpen(false)}
        okButtonColor={theme.PRIMARY}
        okText="Save"
        onCancel={() => setIsModalStatsOpen(false)}
        isOkDisabled={!statName.trim() || statValueStart == 0 || statValueEnd == 0}
        onOk={() => {
          setStats([...stats, { name: statName, value: `${statValueStart} of ${statValueEnd}` }]);
          setStatName("");
          setStatValueStart(1);
          setStatValueEnd(1);
        }}
      >
        <RequiredWrapper>
          <Label htmlFor="stat-name">Name</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput id="stat-name" value={statName} onChange={(e) => setStatName(e.target.value)} />
        <RequiredWrapper>
          <Label htmlFor="stat-value">Value</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <AttributesNumberRow>
          <TextInput
            type="number"
            id="stat-value"
            value={statValueStart}
            min={1}
            onChange={(e) => setStatValueStart(parseInt(e.target.value))}
          />
          <Label htmlFor="stat-of">of</Label>
          <TextInput
            type="number"
            min={1}
            id="stat-of"
            value={statValueEnd}
            onChange={(e) => setStatValueEnd(parseInt(e.target.value))}
          />
        </AttributesNumberRow>
      </Modal>
      <Modal
        width="700px"
        title="Tags"
        isVisible={isModalTagsOpen}
        onCloseButtonPressed={() => setIsModalTagsOpen(false)}
        okButtonColor={theme.PRIMARY}
        okText="Save"
        onCancel={() => setIsModalTagsOpen(false)}
        isOkDisabled={!newTag.trim()}
        onOk={() => {
          setTags([...tags, { name: newTag, id: tags[tags.length - 1].id + 1 }]);
          setIsModalTagsOpen(false);
        }}
      >
        <AttributesRow>
          {INTERESTS.map((interest) => (
            <TagWrapper key={interest.id} onClick={() => toogleTag(interest)}>
              <Tag
                active={!!tags.find((t) => t.id === interest.id)}
                key={interest.id}
                hasCancel={false}
                text={interest.name}
                theme="status"
              />
            </TagWrapper>
          ))}
        </AttributesRow>
        <Label htmlFor="new-tag">Custom tag</Label>
        <TextInput
          value={newTag}
          type="text"
          id="new-tag"
          placeholder="Your custom tag"
          onChange={(e) => setNewTag(e.target.value)}
        />
      </Modal>
    </Main>
  );
};

export default Create;
