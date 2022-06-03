export const getEthValue = (value: string): string => {
  return (parseFloat(value) / 1e18).toString().slice(0, 5);
};
