import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="p-4 overflow-auto flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
