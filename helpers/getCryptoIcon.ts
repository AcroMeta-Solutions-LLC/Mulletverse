export const getCryptoIconName = (chain: string): string => {
  switch (chain) {
    case "matic":
      return "matic";
    case "bscIcon":
      return "bnb";
    case "bnb":
      return "bnb";
    case "bsc":
      return "bnb";
    default:
      return "eth";
  }
};
