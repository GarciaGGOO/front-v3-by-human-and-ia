import { Outlet } from 'react-router-dom';
import { Header } from '../ui/Header';
import { Sidebar } from '../ui/Sidebar';

export function MainLayout() {

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Sidebar />
      <main className="ml-64 mt-16 p-8">
        <Outlet />
      </main>
    </div>
  );
}