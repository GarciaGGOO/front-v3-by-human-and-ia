import { BriefcaseBusiness, Ticket } from 'lucide-react';
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
      icon: Ticket,
      element: <CreateModulesView />,
      enabled: true,
    },
    {
      path: '/core/listAdmin-modules',
      name: 'Criar lista de administração',
      icon: BriefcaseBusiness,
      element: <ListModulesView />,
      enabled: true,
    },
  ],
  enabled: true,
};

export default usersModule;