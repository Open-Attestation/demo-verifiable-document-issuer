import { ComponentProps, createContext, useState, useContext } from "react";
import { dns, FunctionComponentWithChildren } from "../types";

const DnsContext = createContext<{
  dns: dns;
  setDns: (dns: dns) => void;
}>({
  dns: null,
  setDns: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useDnsContext = () => useContext(DnsContext);
export const DnsContextProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [dns, setDns] = useState<dns>(null);

  return (
    <DnsContext.Provider
      value={{
        dns,
        setDns,
      }}
    >
      {children}
    </DnsContext.Provider>
  );
};
