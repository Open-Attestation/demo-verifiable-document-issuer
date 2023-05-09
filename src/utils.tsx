import { ComponentProps } from "react";
import { FunctionComponentWithChildren } from "./types";

export const combineContextProviders = (
  contextProviders: FunctionComponentWithChildren[],
) => {
  return contextProviders.reduce(
    (AccumulatedContextProvider, CurrentContextProvider) => {
      return ({ children }) => {
        return (
          <AccumulatedContextProvider>
            <CurrentContextProvider>{children}</CurrentContextProvider>
          </AccumulatedContextProvider>
        );
      };
    },
    ({ children }: ComponentProps<FunctionComponentWithChildren>) => (
      <>{children}</>
    ),
  );
};
