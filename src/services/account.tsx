import { ethers } from "ethers";

export const getAccount = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;

  const provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_requestAccounts", []);

  return {
    providerSigner: await provider.getSigner(),
    providerNetwork: await provider.getNetwork(),
  };
};
