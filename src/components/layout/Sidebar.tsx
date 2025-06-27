import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';
import { useAppContext } from '../../hooks/useAppContext';

export default function Sidebar() {
  const { user } = useAppContext();
  return (
    <aside className="w-60 bg-white h-screen p-4 border-r">
      <nav className="space-y-2">
        {NAV_ITEMS.filter((i) => !i.role || i.role === user?.role).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-primary-100 ${isActive ? 'bg-primary-200' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
