export const getImageURL = (imagePath: string): string => {
  if (!imagePath) return "";

  if (imagePath.includes("ipfs://ipfs")) {
    return imagePath.replace("ipfs:/", "https://gateway.ipfs.io");
  } else if (imagePath.includes("ipfs://")) {
    return imagePath.replace("ipfs:/", "https://gateway.ipfs.io/ipfs");
  }
  return imagePath;
};
