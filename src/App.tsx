import { AccountContextProvider } from "./contexts/AccountContext";
import { DnsContextProvider } from "./contexts/DnsContext";
import { DocumemtStoreProvider } from "./contexts/DocumentStoreContext";
import { StatusProvider } from "./contexts/StatusContext";
import { StepProvider } from "./contexts/StepContext";
import { WrappedDocumentProvider } from "./contexts/WrappedDocumentContext";
import { Steps } from "./components/Steps";
import { combineContextProviders } from "./utils";
import "./App.css";

const App = () => {
  const providers = [
    AccountContextProvider,
    DnsContextProvider,
    DocumemtStoreProvider,
    StatusProvider,
    StepProvider,
    WrappedDocumentProvider,
  ];
  const AppContextProvider = combineContextProviders(providers);

  return (
    <AppContextProvider>
      <main>
        <Steps />
      </main>
    </AppContextProvider>
  );
};

export default App;
