import { JsonRpcSigner } from "@ethersproject/providers";
import { ComponentProps, createContext, useState, useContext } from "react";
import { signer, network, FunctionComponentWithChildren } from "../types";

const AccountContext = createContext<{
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAccountContext = () => useContext(AccountContext);
export const AccountContextProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [signer, setSigner] = useState<signer>(null);
  const [network, setNetwork] = useState<network>(null);

  return (
    <AccountContext.Provider
      value={{
        signer,
        setSigner,
        network,
        setNetwork,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
