import { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { useAppContext } from '../hooks/useAppContext';

export default function Login() {
  const { login, isAuthenticated } = useAppContext();
  const [tenants, setTenants] = useState<any[]>([]);
  const [tenantId, setTenantId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    api.getTenants().then(setTenants);
  }, []);

  if (isAuthenticated) {
    window.location.hash = '#/dashboard';
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(tenantId, userId);
        }}
        className="bg-white p-4 rounded shadow space-y-2"
      >
        <select value={tenantId} onChange={(e) => setTenantId(e.target.value)} className="border px-2 py-1 w-full">
          <option value="">Seleccione Empresa</option>
          {tenants.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {tenantId && (
          <select value={userId} onChange={(e) => setUserId(e.target.value)} className="border px-2 py-1 w-full">
            <option value="">Seleccione Usuario</option>
            {tenants
              .find((t) => t.id === tenantId)
              ?.users.map((u: any) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </select>
        )}
        <button disabled={!tenantId || !userId} className="bg-primary-500 text-white px-3 py-1 rounded w-full" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
