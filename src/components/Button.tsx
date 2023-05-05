import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const Button = ({
  buttonText,
  onHandler,
}: {
  buttonText: string;
  onHandler: () => void;
}) => {
  const { status } = useContext(AppContext);

  return (
    <button
      onClick={onHandler}
      disabled={status === "pending"}
      style={{ margin: "0 8px 8px 0" }}
    >
      {status === "pending" ? "Pending..." : buttonText}
    </button>
  );
};
