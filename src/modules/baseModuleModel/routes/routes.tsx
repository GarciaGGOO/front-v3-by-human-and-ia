import { LucidePanelRightClose, LampDeskIcon } from 'lucide-react';
import { DesignerAlignment } from '../pages/DesignerAlignment';

import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'designerAlignment',
  name: "Alinhamento de designer",
  icon: LampDeskIcon,
  routes: [
    {
      path: '/designer-alignment',
      name: 'Designer de alinhamento 1',
      icon: LucidePanelRightClose,
      element:<DesignerAlignment />,
      enabled: true,
    },
  ],
  enabled: true,
};

export default usersModule;