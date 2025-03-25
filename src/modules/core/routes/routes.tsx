import { FolderCog, Table2, TableColumnsSplitIcon, FolderPlus } from 'lucide-react';
import { CreateModulesView } from '../pages/CreateModulesView';
import { ListModulesView } from '../pages/ListModulesView';
import { ListComputers } from '../pages/ListComputers';
import type { Module } from '@/common/types/index';
import { table } from 'console';

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
    {
      path: '/core/list-coputers',
      name: 'lista de computadores',
      icon: TableColumnsSplitIcon,
      element: <ListComputers />,
      enabled: true,
    }
  ],
  enabled: true,
};

export default usersModule;