import { LucidePanelRightClose, LampDeskIcon, TestTubeDiagonalIcon } from 'lucide-react';
import { DesignerAlignment } from '../pages/DesignerAlignment';

import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'designerAlignment',
  name: "Alinhamento de designer",
  icon: LampDeskIcon,
  routes: [
    {
      path: '/example-route',
      name: 'teste',
      icon: LucidePanelRightClose,
      element:<TestTubeDiagonalIcon />,
      enabled: true,
    },
  ],
  enabled: false,
};

export default usersModule;