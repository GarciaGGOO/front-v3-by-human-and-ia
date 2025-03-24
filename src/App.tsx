import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./common/contexts/ThemeContext";
import { ModulesProvider } from "./common/contexts/ModulesContext";
import { AppRoutes } from "./common/routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ModulesProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </ModulesProvider>
    </BrowserRouter>
  );
}

export default App;
