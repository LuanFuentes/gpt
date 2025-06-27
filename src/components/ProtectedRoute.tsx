import { ComponentType } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

interface Props {
  component: ComponentType<any>;
  requiredRole?: string;
}

export default function ProtectedRoute({ component: Component, requiredRole }: Props) {
  const { isAuthenticated, user } = useAppContext();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;
  return (
    <Component>
      <Outlet />
    </Component>
  );
}
