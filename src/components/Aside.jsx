import { NavLink, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Aside({ navItems, isMenuOpen, toggleMenu }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const activeParent = navItems.find(
      item =>
        item.to === location.pathname ||
        (item.children &&
          item.children.some(child => child.to === location.pathname)),
    );

    if (activeParent) {
      setOpenDropdown(activeParent.id);
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname, navItems]);

  const isParentActive = item =>
    item.to === location.pathname ||
    (item.children &&
      item.children.some(child => child.to === location.pathname));

  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        transform transition-transform duration-500 ease-in-out`}
    >
      <div className="flex justify-end p-4">
        <button
          className="text-white focus:outline-none"
          aria-label="Close menu"
          onClick={toggleMenu}
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col space-y-2 p-4">
        {navItems.map(item => (
          <div key={item.id} className="flex flex-col">
            <NavLink
              to={item.to}
              end={!item.children}
              className={`flex items-center justify-between hover:text-gray-300 ${
                isParentActive(item) ? 'text-yellow-400 font-bold' : ''
              }`}
              onClick={() => {
                if (item.children) {
                  setOpenDropdown(openDropdown === item.id ? null : item.id);
                } else {
                  toggleMenu();
                }
              }}
            >
              <span className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
              {item.children && (
                <span>{openDropdown === item.id ? '▲' : '▼'}</span>
              )}
            </NavLink>

            {item.children && openDropdown === item.id && (
              <div className="ml-6 mt-1 flex flex-col space-y-1">
                {item.children.map(sub => (
                  <NavLink
                    key={sub.id}
                    to={sub.to}
                    end
                    className={({ isActive }) =>
                      `hover:text-gray-300 block px-4 py-2 text-sm ${
                        isActive ? 'text-yellow-400 font-bold' : ''
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
