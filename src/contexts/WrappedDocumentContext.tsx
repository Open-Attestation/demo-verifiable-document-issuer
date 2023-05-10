import { ComponentProps, createContext, useState, useContext } from "react";
import { wrappedDocument, FunctionComponentWithChildren } from "../types";

const WrappedDocumentContext = createContext<{
  wrappedDocument: wrappedDocument;
  setWrappedDocument: (wrappedDocument: wrappedDocument) => void;
}>({
  wrappedDocument: null,
  setWrappedDocument: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useWrappedDocumentContext = () =>
  useContext(WrappedDocumentContext);
export const WrappedDocumentProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [wrappedDocument, setWrappedDocument] = useState<wrappedDocument>(null);

  return (
    <WrappedDocumentContext.Provider
      value={{
        wrappedDocument,
        setWrappedDocument,
      }}
    >
      {children}
    </WrappedDocumentContext.Provider>
  );
};
