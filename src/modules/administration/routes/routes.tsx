import { BriefcaseBusiness } from 'lucide-react';
import { CreateModulesView } from '../pages/CreateModulesView';
import { ListModulesView } from '../pages/ListModulesView';
import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'Administration',
  name: "Administração",
  icon: BriefcaseBusiness,
  routes: [
    {
      path: '/core/admin-modules',
      name: 'Criar administradores',
      element: <CreateModulesView />,
    },
    {
      path: '/core/listAdmin-modules',
      name: 'Criar lista de administração',
      element: <ListModulesView />,
    },
  ],
};

export default usersModule;