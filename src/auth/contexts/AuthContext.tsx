import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function login({ email, password }: { email: string; password: string }) {
    const response = await fakeLoginRequest(email, password);
    
    if (!response.success) {
      throw new Error("Credenciais inválidas"); // 🚨 Agora um erro será lançado
    }
  
    localStorage.setItem("user", JSON.stringify(response.user));
    setUser(response.user);
    console.log("User após login:", response.user);
    navigate("/"); 
  }
  

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  if (loading) return <div>Carregando...</div>; // Bloqueia carregamento prematuro

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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

async function fakeLoginRequest(email: string, password: string) {
  return new Promise<{ success: boolean; user?: User }>((resolve) =>
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        resolve({
          success: true,
          user: { id: "1", name: "Admin", permissions: ["core", "designerAlignment"] },
        });
      } else {
        resolve({ success: false });
      }
    }, 1000)
  );
}
