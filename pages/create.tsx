import { NextPage } from "next";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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
} from "../styles/CreateStyled";

const Create: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");

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
          <Label htmlFor="name">Name</Label>
          <Required>*</Required>
        </RequiredWrapper>
        <TextInput type="text" id="name" placeholder="Item name" />
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
      </Form>
    </Main>
  );
};

export default Create;
