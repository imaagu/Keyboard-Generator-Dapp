import Main from "./container/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThirdwebProvider } from "@3rdweb/react";

import { connectors, supportedChainIds } from "./utils/connectors";
function App() {
  console.log(connectors, supportedChainIds);
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Toaster />
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 max-w-screen-2xl min-h-screen p-5">
        <Router>
          <Switch>
            <Route
              path="/create"
              component={(props) => <Main {...props} isForm={true} />}
            />
            <Route
              path="/"
              component={(props) => <Main {...props} isForm={false} />}
            />
          </Switch>
        </Router>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
