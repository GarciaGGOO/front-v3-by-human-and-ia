import { FolderCog } from 'lucide-react';
import { CreateModulesView } from '../pages/CreateModulesView';
import { ListModulesView } from '../pages/ListModulesView';
import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'core',
  name: "",
  icon: FolderCog,
  routes: [
    {
      path: '/core/create-modules',
      name: 'Criar módulos',
      element: <CreateModulesView />,
    },
    {
      path: '/core/list-modules',
      name: 'Criar lista de módulos',
      element: <ListModulesView />,
    },
  ],
};

export default usersModule;