import { useState } from "react";
import { AppContext } from "./contexts/AppContext";
import { AccountContext } from "./contexts/AccountContext";
import { Steps } from "./components/Steps";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import {
  status,
  step,
  signer,
  network,
  documentStoreAddress,
  dns,
  wrappedDocument,
} from "./types";
import "./App.css";

const App = () => {
  const [signer, setSigner] = useState<signer>(null);
  const [network, setNetwork] = useState<network>(null);
  const [documentStoreAddress, setDocumentStoreAddress] =
    useState<documentStoreAddress>(null);
  const [dns, setDns] = useState<dns>(null);
  const [status, setStatus] = useState<status>("initial");
  const [currentStep, setCurrentStep] = useState<step>("connect");
  const [wrappedDocument, setWrappedDocument] = useState<wrappedDocument>(null);

  return (
    <AppContext.Provider
      value={{
        dns,
        setDns,
        documentStoreAddress,
        setDocumentStoreAddress,
        status,
        setStatus,
        currentStep,
        setCurrentStep,
        wrappedDocument,
        setWrappedDocument,
      }}
    >
      <AccountContext.Provider
        value={{
          signer,
          setSigner,
          network,
          setNetwork,
        }}
      >
        <main>
          <Steps />
        </main>
      </AccountContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
