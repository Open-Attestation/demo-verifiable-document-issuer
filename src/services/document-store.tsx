import { JsonRpcSigner } from "@ethersproject/providers";
import { DocumentStoreFactory } from "@govtechsg/document-store";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";

export const deployDocumentStore = async (signer: JsonRpcSigner) => {
  const factory = new DocumentStoreFactory(signer);
  const documentStore = await factory.deploy(
    "My Document Store",
    await signer.getAddress(),
  );
  await documentStore.deployTransaction.wait();
  return documentStore.address;
};

export const issueDocument = async ({
  wrappedDocument,
  documentStoreAddress,
  signer,
}: {
  wrappedDocument: WrappedDocument;
  documentStoreAddress: string;
  signer: JsonRpcSigner;
}) => {
  const {
    signature: { targetHash },
  } = wrappedDocument;
  const documentStore = DocumentStoreFactory.connect(
    documentStoreAddress,
    signer,
  );
  const receipt = await documentStore.issue(`0x${targetHash}`);
  await receipt.wait();
};
