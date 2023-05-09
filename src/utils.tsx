import { ComponentProps } from "react";
import { FunctionComponentWithChildren } from "./types";

export const combineContextProviders = (
  components: FunctionComponentWithChildren[],
) => {
  return components.reduce(
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
