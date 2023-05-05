import { JsonRpcSigner } from "@ethersproject/providers";
import { createContext } from "react";
import { signer, network } from "../types";

export const AccountContext = createContext<{
  signer: signer;
  setSigner: (signer: JsonRpcSigner) => void;
  network: network;
  setNetwork: (networkId: network) => void;
}>({
  signer: null,
  setSigner: () => null,
  network: null,
  setNetwork: () => null,
});
