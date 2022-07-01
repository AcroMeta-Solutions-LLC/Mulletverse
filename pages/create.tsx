import { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "styled-components";
import { Checkbox, Icon, Modal, Tag } from "web3uikit";
import { FaPlus } from "react-icons/fa";
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
} from "../styles/CreateStyled";

type BlockchainType = "eth" | "matic" | "bnb" | "solana";
type AttributeType = { name: string; value: string };

const Create: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalPropertiesOpen, setIsModalPropertiesOpen] = useState(false);
  const [isModalLevelsOpen, setIsModalLevelsOpen] = useState(false);
  const [isModalStatsOpen, setIsModalStatsOpen] = useState(false);
  const [blockchain, setBlockchain] = useState<BlockchainType>("eth");
  const theme: any = useTheme();
  const [properties, setProperties] = useState<AttributeType[]>([]);
  const [levels, setLevels] = useState<AttributeType[]>([]);
  const [stats, setStats] = useState<AttributeType[]>([]);
  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [levelName, setLevelName] = useState("");
  const [levelValueStart, setLevelValueStart] = useState(1);
  const [levelValueEnd, setLevelValueEnd] = useState(1);
  const [statName, setStatName] = useState("");
  const [statValueStart, setStatValueStart] = useState(1);
  const [statValueEnd, setStatValueEnd] = useState(1);

  const onAddfiles = useCallback((acceptedFiles: File[]) => {
    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setImageUrl(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 100000,
    onDrop: onAddfiles,
  });

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Main>
      <Form onSubmit={submitForm}>
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
        <TextInput type="text" id="nft-name" placeholder="Item name" />
        <Label htmlFor="external-link">External link</Label>
        <TextInput type="text" id="external-link" placeholder="http://website.com/item/123" />
        <Label htmlFor="description">Description</Label>
        <Small>The description provided will be included on the item`s details page.</Small>
        <TextArea id="description" />
        <RequiredWrapper>
          <Label htmlFor="collection">Collection</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <Small>This is the collection where your item will appear.</Small>
        <Select></Select>
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
        <AttributeWrapper>
          <Attribute>
            <Label htmlFor="unlockable-content">Unlockable Content</Label>
            <Small>Include unlockable content that can only be revealed by the owner of the item.</Small>
          </Attribute>
          <Checkbox
            layout="switch"
            checked={false}
            label=""
            id="unlockable-content"
            name="unlockable-content"
            onChange={() => {}}
          />
        </AttributeWrapper>
        <AttributeWrapper>
          <Attribute>
            <Label htmlFor="explicit">Explicit & Sensitive Content</Label>
            <Small>Set this item as explicit and sensitive content.</Small>
          </Attribute>
          <Checkbox layout="switch" checked={false} label="" id="explicit" name="explicit" onChange={() => {}} />
        </AttributeWrapper>
        <RequiredWrapper>
          <Label htmlFor="supply">Supply</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <Small>The number of items that can be minted.</Small>
        <TextInput type="number" id="supply" min={1} />
        <Label htmlFor="blockchain">Blockchain</Label>
        <SelectIconWrapper>
          <Icon fill={theme.PRIMARY} size={20} svg={blockchain as any} />
          <SelectIcon
            value={blockchain}
            id="blockchain"
            onChange={(e) => setBlockchain(e.target.value as BlockchainType)}
          >
            <option value="eth">Ethereum</option>
            <option value="matic">Polygon</option>
            <option value="bnb">Binance</option>
          </SelectIcon>
        </SelectIconWrapper>
        <Submit value="Create" />
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
    </Main>
  );
};

export default Create;
