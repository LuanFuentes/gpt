import { useAppContext } from '../../hooks/useAppContext';

export default function Header() {
  const { tenant, user, logout } = useAppContext();
  return (
    <header className="flex items-center justify-between bg-white p-4 border-b">
      <div className="font-bold text-lg">{tenant?.name}</div>
      <div className="flex items-center gap-2">
        <span>{user?.name}</span>
        <button className="text-sm text-red-500" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
