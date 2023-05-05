import { useContext } from "react";
import { saveAs } from "file-saver";
import { AccountContext } from "../contexts/AccountContext";
import { AppContext } from "../contexts/AppContext";
import { step } from "../types";
import { getAccount } from "../services/account";
import { deployDocumentStore } from "../services/document-store";
import { Button } from "../components/Button";
import { Dns } from "../components/Dns";
import { DocumentForm } from "../components/DocumentForm";

const Step = ({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: React.ReactElement;
}) => {
  return (
    <>
      <h2>
        {index + 1}. {title}
      </h2>
      {body}
    </>
  );
};

export const Steps = () => {
  const { signer, setSigner, setNetwork } = useContext(AccountContext);
  const {
    setDocumentStoreAddress,
    setStatus,
    currentStep,
    setCurrentStep,
    wrappedDocument,
  } = useContext(AppContext);

  const onConnect = async () => {
    try {
      const { providerSigner, providerNetwork } = await getAccount();
      setSigner(providerSigner);
      setNetwork(providerNetwork);
      setCurrentStep("deploy");
    } catch (e) {
      console.error(e);
    }
  };

  const onDeploy = async () => {
    try {
      setStatus("pending");

      const documentStoreAddress = await deployDocumentStore(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signer!,
      );
      setDocumentStoreAddress(documentStoreAddress);

      setCurrentStep("dns");
      setStatus("initial");
    } catch (e) {
      setStatus("error");
      console.error(e);
    }
  };

  const onDownload = () => {
    const blob = new Blob([JSON.stringify(wrappedDocument, null, 2)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, `SIMPLE_COO_DOCUMENT.tt`);
  };

  const onCreateAnother = () => {
    setCurrentStep("document");
  };

  const steps: {
    key: step;
    title: string;
    body: React.ReactElement;
  }[] = [
    {
      key: "connect",
      title: "Connect Metamask Extension",
      body: <Button buttonText="Connect" onHandler={onConnect} />,
    },
    {
      key: "deploy",
      title: "Deploy Document Store",
      body: <Button buttonText="Deploy" onHandler={onDeploy} />,
    },
    {
      key: "dns",
      title: "Domain Name Configuration",
      body: <Dns />,
    },
    {
      key: "document",
      title: "Edit Document Form",
      body: <DocumentForm />,
    },
    {
      key: "download",
      title: "Download & Verify",
      body: (
        <>
          <Button buttonText="Download" onHandler={onDownload} />
          <a
            href="https://dev.tradetrust.io/verify"
            target="_blank"
            rel="noreferrer noopener"
            style={{ margin: "0 8px 8px 0" }}
          >
            <button>Verify</button>
          </a>
          <Button buttonText="Create Another" onHandler={onCreateAnother} />
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        {steps.map((step) => (
          <div
            key={`step-${step.key}`}
            style={{
              padding: "0 8px",
              borderLeft: currentStep === step.key ? "solid 4px white" : "none",
            }}
          >
            <div
              style={{
                opacity: currentStep === step.key ? "1" : "0.2",
                lineHeight: 1.3,
                fontSize: "13px",
              }}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
      {steps.map(
        (step, index) =>
          currentStep === step.key && <Step {...{ index, ...step }} />,
      )}
    </>
  );
};
