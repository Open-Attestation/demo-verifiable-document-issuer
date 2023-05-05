import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { AccountContext } from "../contexts/AccountContext";
import { Button } from "../components/Button";
import { dns } from "../types";

export const Dns = () => {
  const { documentStoreAddress, setDns, setCurrentStep } =
    useContext(AppContext);
  const { network } = useContext(AccountContext);

  const onConfirm = () => {
    setCurrentStep("document");
  };

  const onChange = (event: { target: { value: dns } }) => {
    setDns(event.target.value);
  };

  return (
    <div>
      <section style={{ marginBottom: "24px" }}>
        <p>
          Copy and paste the command below into a terminal to get a temporary
          DNS.
        </p>
        <code
          style={{
            padding: "8px 12px",
            backgroundColor: "black",
            display: "block",
          }}
        >
          npx open-attestation dns txt-record create --address{" "}
          {documentStoreAddress} --network-id {network?.chainId}
        </code>
      </section>
      <section style={{ marginBottom: "24px" }}>
        <p>Enter the temporary DNS given in the input below.</p>
        <input
          style={{ padding: "8px 12px", width: "100%" }}
          type="text"
          placeholder="few-green-cat.sandbox.openattestation.com"
          onChange={onChange}
        />
      </section>
      <Button buttonText="Confirm" onHandler={onConfirm} />
    </div>
  );
};
