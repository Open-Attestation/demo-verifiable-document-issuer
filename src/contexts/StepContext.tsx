import { ComponentProps, createContext, useState, useContext } from "react";
import { step, FunctionComponentWithChildren } from "../types";

const StepContext = createContext<{
  currentStep: step;
  setCurrentStep: (currentStep: step) => void;
}>({
  currentStep: "document",
  setCurrentStep: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useStepContext = () => useContext(StepContext);
export const StepProvider = ({
  children,
}: ComponentProps<FunctionComponentWithChildren>): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<step>("connect");

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
