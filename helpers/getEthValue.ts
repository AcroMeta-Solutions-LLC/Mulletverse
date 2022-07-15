import { ethers, BigNumber } from "ethers";

export const getEthValue = (value: string): string => {
  const bigNumber = BigNumber.from(value);
  const parsedValue = ethers.utils.formatEther(bigNumber).toString();
  return parsedValue;
};
