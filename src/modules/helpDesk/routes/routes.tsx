import { HeartPulse, TicketsIcon } from 'lucide-react';
import { Tickets } from '../pages/Tickets'; // Corrigido: Nome correto do componente

import type { Module } from '@/common/types/index';

export const usersModule: Module = {
  id: 'helpDesk',
  name: "Help Desk",
  icon: HeartPulse,
  routes: [
    {
      path: '/helpDesk/tickets',
      name: 'Tickets',
      icon: TicketsIcon,
      element: <Tickets />, // Corrigido: Nome correto do componente
      enabled: true,
    },
  ],
  enabled: true,
};

export default usersModule;
