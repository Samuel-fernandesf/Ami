import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/RouterConfig";
import { ModalProvider } from "./components/modal/Modal";

function App() {
  return (
    <Router>
      <ModalProvider>
        <RouterConfig />
      </ModalProvider>
    </Router>
  );
}

export default App;