import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Button from './Button';
import Aside from './Aside';

function Header() {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    {
      id: 'about',
      label: 'About',
      icon: <FaInfoCircle />,
      to: '/about',
      children: [
        { id: 'about-main', label: 'About', to: '/about' },
        { id: 'contact', label: 'Contact', to: '/about/contact' },
      ],
    },
    {
      id: 'work',
      label: 'Work List',
      icon: <FaEnvelope />,
      to: '/work',
      children: [
        { id: 'worklist', label: 'Work List', to: '/work' },
        { id: 'guide', label: 'Guide', to: '/work/guide' },
      ],
    },

    {
      id: 'example',
      label: 'Components',
      icon: <FaInfoCircle />,
      to: '/example',
      children: [
        { id: 'agree', label: 'Agree Form', to: '/example' },
        {
          id: 'bottomsheet',
          label: 'Bottom Sheet',
          to: '/example/bottomsheet',
        },
        { id: 'button', label: 'Button', to: '/example/button' },
        { id: 'chart', label: 'Chart', to: '/example/chart' },
        { id: 'checkbox', label: 'Checkbox&Radio', to: '/example/checkbox' },
        { id: 'faq', label: 'FAQ', to: '/example/faq' },
        { id: 'floatingbar', label: 'FloatingBar', to: '/example/floatingbar' },
        { id: 'form', label: 'Form', to: '/example/form' },
        { id: 'info', label: 'Info', to: '/example/info' },
        { id: 'list', label: 'List', to: '/example/list' },
        { id: 'popup', label: 'Popup', to: '/example/popup' },
        { id: 'search', label: 'Search Form', to: '/example/search' },
        { id: 'selectbox', label: 'Selectbox', to: '/example/selectbox' },
        { id: 'tabs', label: 'Tabs', to: '/example/tabs' },
        { id: 'table', label: 'Table', to: '/example/table' },
        { id: 'title', label: 'Title', to: '/example/title' },
      ],
    },
    {
      id: 'product',
      label: 'Product',
      icon: <FaInfoCircle />,
      to: '/product',
      children: [
        { id: 'product', label: 'List Page', to: '/product' },
        { id: 'stickypage', label: 'Sticky Page', to: '/product/stickypage' },
      ],
    },
    {
      id: 'etc',
      label: 'Etc',
      icon: <FaInfoCircle />,
      to: '/etc',
      children: [
        { id: 'scrollpage', label: 'Scroll Page', to: '/etc' },
        { id: 'page1', label: 'Page Move', to: '/etc/page1' },
        { id: 'stickypage', label: 'Sticky Page', to: '/etc/stickypage' },
      ],
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 bg-gray-800 text-white px-4 z-50">
      <div className="container mx-auto flex justify-between items-center h-14">
        {/* 로고 */}
        <Link to="/" className="text-xl font-bold">
          Learn Canvas
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex space-x-6 relative">
          {navItems.map(item => {
            const isParentActive =
              location.pathname === item.to ||
              location.pathname.startsWith(item.to + '/') ||
              (item.children &&
                item.children.some(child =>
                  location.pathname.startsWith(child.to),
                ));

            return (
              <div key={item.id} className="relative group">
                <NavLink
                  to={item.to}
                  className={`flex items-center space-x-2 hover:text-gray-300 ${
                    isParentActive ? 'text-yellow-400 font-bold' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>

                {item.children && (
                  <div className="absolute left-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map(sub => (
                      <NavLink
                        key={sub.id}
                        to={sub.to}
                        end
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-600 ${
                            isActive ? 'text-yellow-400 font-bold' : ''
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Button className="hidden md:block">짐코딩 강의</Button>
      </div>

      {/* 모바일 메뉴 */}
      <Aside
        navItems={navItems}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </header>
  );
}

export default Header;
