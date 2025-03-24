import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const backgrounds = {
  "bmtech.com.br":
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
  "colegiouirapuru.com.br":
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "casadoconstrutor.com.br":
    "https://images.unsplash.com/photo-1541976590-713941681591",
  default: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
};

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@example.com"); // Default value for testing
  const [password, setPassword] = useState("admin123"); // Default value for testing
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState(backgrounds.default);

  useEffect(() => {
    const domain = email.split("@")[1];
    if (domain) {
      setBackground(
        backgrounds[domain as keyof typeof backgrounds] || backgrounds.default
      );
    } else {
      setBackground(backgrounds.default);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-[480px] bg-white p-12 flex flex-col justify-between">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Bem-vindo
            </h1>
            <p className="text-gray-600">Faça login para continuar</p>
            <p className="text-sm text-gray-500 mt-2">
              Use as credenciais padrão:
              <br />
              Email: admin@example.com
              <br />
              Senha: admin123
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Lembrar meus dados
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <div className="text-sm text-gray-500">
          <p>© 2025 Bmtech. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="flex-1 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(${background})`,
        }}
      />
    </div>
  );
};
