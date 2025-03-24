import { FolderCog, Table2, FolderPlus } from 'lucide-react';
import { CreateModulesView } from '../pages/CreateModulesView';
import { ListModulesView } from '../pages/ListModulesView';
import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'core',
  name: undefined,
  icon: FolderCog,
  routes: [
    {
      path: '/core/create-modules',
      name: 'Criar módulos',
      icon: FolderPlus,
      element: <CreateModulesView />,
      enabled: true,
    },
    {
      path: '/core/list-modules',
      name: 'Criar lista de módulos',
      icon: Table2,
      element: <ListModulesView />,
      enabled: true,
    },
  ],
  enabled: true,
};

export default usersModule;