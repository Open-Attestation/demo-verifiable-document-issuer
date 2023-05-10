import { ComponentProps, createContext, useState, useContext } from "react";
import { documentStoreAddress, FunctionComponentWithChildren } from "../types";

const DocumentStoreContext = createContext<{
  documentStoreAddress: documentStoreAddress;
  setDocumentStoreAddress: (documentStoreAddress: documentStoreAddress) => void;
}>({
  documentStoreAddress: null,
  setDocumentStoreAddress: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useDocumentStoreContext = () => useContext(DocumentStoreContext);
export const DocumemtStoreProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [documentStoreAddress, setDocumentStoreAddress] =
    useState<documentStoreAddress>(null);

  return (
    <DocumentStoreContext.Provider
      value={{
        documentStoreAddress,
        setDocumentStoreAddress,
      }}
    >
      {children}
    </DocumentStoreContext.Provider>
  );
};
