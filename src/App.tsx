import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./common/contexts/ThemeContext";
import { ModulesProvider } from "./common/contexts/ModulesContext";
import { AppRoutes } from "./common/routes/routes";
import { AuthProvider } from "./auth/contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModulesProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </ModulesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
