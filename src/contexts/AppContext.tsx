import { createContext } from "react";
import {
  dns,
  documentStoreAddress,
  status,
  step,
  wrappedDocument,
} from "../types";

export const AppContext = createContext<{
  dns: dns;
  setDns: (dns: dns) => void;
  documentStoreAddress: documentStoreAddress;
  setDocumentStoreAddress: (documentStoreAddress: documentStoreAddress) => void;
  status: status;
  setStatus: (status: status) => void;
  currentStep: step;
  setCurrentStep: (currentStep: step) => void;
  wrappedDocument: wrappedDocument;
  setWrappedDocument: (wrappedDocument: wrappedDocument) => void;
}>({
  dns: null,
  setDns: () => null,
  documentStoreAddress: null,
  setDocumentStoreAddress: () => null,
  status: "initial",
  setStatus: () => null,
  currentStep: "document",
  setCurrentStep: () => null,
  wrappedDocument: null,
  setWrappedDocument: () => null,
});
