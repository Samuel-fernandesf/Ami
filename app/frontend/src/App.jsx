import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/RouterConfig";
import { ModalProvider } from "./components/modal/Modal";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <RouterConfig />
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;