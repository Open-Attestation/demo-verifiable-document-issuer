import { useContext } from "react";
import { wrapDocument } from "@govtechsg/open-attestation";
import { AppContext } from "../contexts/AppContext";
import { AccountContext } from "../contexts/AccountContext";
import { issueDocument } from "../services/document-store";

export const DocumentForm = () => {
  const {
    dns,
    documentStoreAddress,
    status,
    setStatus,
    setCurrentStep,
    setWrappedDocument,
  } = useContext(AppContext);
  const { signer } = useContext(AccountContext);

  const documentBase = {
    $template: {
      name: "SIMPLE_COO",
      type: "EMBEDDED_RENDERER",
      url: "https://generic-templates.tradetrust.io",
    },
    issuers: [
      {
        name: "Demo Issuer",
        documentStore: documentStoreAddress,
        identityProof: {
          type: "DNS-TXT",
          location: dns,
        },
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDocumentSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const documentData = {
      documentName: data.get("documentName"),
      issueDateAndTime: data.get("issueDateAndTime"),
      issueIn: data.get("issueIn"),
      cooId: data.get("cooId"),
    };

    const rawDocument = {
      ...documentBase,
      ...documentData,
    };

    try {
      setStatus("pending");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrappedDocument = wrapDocument(rawDocument as any);

      await issueDocument({
        wrappedDocument,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        signer: signer!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        documentStoreAddress: documentStoreAddress!,
      });

      setWrappedDocument(wrappedDocument);
      setCurrentStep("download");

      setStatus("initial");
    } catch (e) {
      setStatus("error");
      console.error(e);
    }
  };

  return (
    <form onSubmit={onDocumentSubmit}>
      <section style={{ marginBottom: "24px" }}>
        <p>Document Name</p>
        <input
          style={{ padding: "8px 12px", width: "100%" }}
          type="text"
          name="documentName"
          defaultValue="Form for Free Trade Agreement"
        />
      </section>
      <section style={{ marginBottom: "24px" }}>
        <p>Issued Date &amp; Time</p>
        <input
          style={{ padding: "8px 12px", width: "100%" }}
          type="text"
          name="issueDateAndTime"
          defaultValue="1 May 2023, 3:05pm"
        />
      </section>
      <section style={{ marginBottom: "24px" }}>
        <p>Issued In</p>
        <input
          style={{ padding: "8px 12px", width: "100%" }}
          type="text"
          name="issueIn"
          defaultValue="Singapore"
        />
      </section>
      <section style={{ marginBottom: "24px" }}>
        <p>COO Id</p>
        <input
          style={{ padding: "8px 12px", width: "100%" }}
          type="text"
          name="cooId"
          defaultValue="123456"
        />
      </section>
      <button type="submit" disabled={status === "pending"}>
        {status === "pending" ? "Pending..." : "Submit"}
      </button>
    </form>
  );
};
