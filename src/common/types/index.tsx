// Tipo para respostas da API
export type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
  };
  
  // Props base para componentes
  export type BaseProps = {
    className?: string;
    children?: React.ReactNode;
  };
  
  // Tipos de tema disponíveis
  export type Theme = 'light' | 'dark';
  
  // Tipo para módulos do sistema
  export type Module = {
    id: string;
    name: string;
    icon: React.ElementType;
    routes: ModuleRoute[];
  };
  
  // Tipo para rotas dos módulos
  export type ModuleRoute = {
    path: string;
    name: string;
    element: React.ReactNode;
  };