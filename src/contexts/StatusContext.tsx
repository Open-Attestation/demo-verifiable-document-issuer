import { ComponentProps, createContext, useState, useContext } from "react";
import { status, FunctionComponentWithChildren } from "../types";

const StatusContext = createContext<{
  status: status;
  setStatus: (status: status) => void;
}>({
  status: "initial",
  setStatus: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStatusContext = () => useContext(StatusContext);
export const StatusProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [status, setStatus] = useState<status>("initial");

  return (
    <StatusContext.Provider
      value={{
        status,
        setStatus,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
