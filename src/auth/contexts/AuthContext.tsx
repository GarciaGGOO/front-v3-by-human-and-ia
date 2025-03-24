import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Tenta carregar o usuário do localStorage ao iniciar a aplicação
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function login({ email, password }: { email: string; password: string }) {
    // Simula requisição à API
    const response = await fakeLoginRequest(email, password);

    if (response.success) {
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      navigate("/"); // Redireciona para a página inicial
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Simula uma API de login
async function fakeLoginRequest(email: string, password: string) {
  return new Promise<{ success: boolean; user?: User }>((resolve) =>
    setTimeout(() => {
      if (email === "admin@example.com" && password === "123456") {
        resolve({
          success: true,
          user: { id: "1", name: "Admin", permissions: ["ADMIN", "DASHBOARD"] },
        });
      } else {
        resolve({ success: false });
      }
    }, 1000)
  );
}
