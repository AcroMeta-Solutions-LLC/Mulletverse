import NFTType from "../types/NFTType";

export const getImageURL = (imagePath: string): string => {
  if (!imagePath) return "";
  if (imagePath.includes("ipfs:/")) {
    return imagePath.replace("ipfs:/", "https://ipfs.io");
  }
  return imagePath;
};
