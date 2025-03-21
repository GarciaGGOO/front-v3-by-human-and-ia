import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./common/contexts/ThemeContext";
import { ModulesProvider } from "./common/contexts/ModulesContext";
import { AppRoutes } from "./common/routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
          <ModulesProvider>
            <AppRoutes />
          </ModulesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
