import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import Search from './Search';
import './styles/styles.css';

import LoginButton from './login-signup/LoginButton';
import LogoutButton from './login-signup/LogoutButton';

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './DarkMode';
import LanguageSwitcher from './LangSwitch';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { isAuthenticated, isLoading, error } = useAuth0();

  const [showSearch, setShowSearch] = useState<boolean>(true);

  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{ transform: `translateY(-${offset}px)` }}
      className=" fixed w-full top-0 px-3  bg-gray-600/50
      border-b dark:shadow-black/50 dark:shadow-2xl border-purple-700 z-50 backdrop-blur-lg
      transition-transform duration-75 will-change-transform
      "
    >
      <nav className="w-full flex justify-between items-center h-20 text-white">
        <h1
          className={`text-4xl font-extrabold text-purple-700 text-shadow-xs hover:scale-105 text-shadow-black hover:text-purple-600 cursor-pointer `}
          onClick={() => navigate('/Home')}
        >
          MovieApp
        </h1>
        <ul className="flex gap-8 text-lg font-semibold">
          <li
            className={`cursor-pointer p-2 px-3 hover:bg-purple-200 rounded-2xl hover:text-purple-700 transition ${location.pathname === '/movies/discover' ? 'bg-purple-200 text-purple-700 border-2 border-purple-700' : ''} `}
            onClick={() => navigate('/movies/discover')}
          >
            {t('movies')}
          </li>

          <li
            className={`cursor-pointer p-2 px-3 hover:bg-purple-200 rounded-2xl hover:text-purple-700 transition ${location.pathname === '/tvshow/discover' ? 'bg-purple-200 text-purple-700 border-2 border-purple-700' : ''} `}
            onClick={() => navigate('/tvshow/discover')}
          >
            {t('tvShows')}
          </li>

          <li ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="cursor-pointer p-2 px-3 hover:bg-purple-200
               rounded-2xl hover:text-purple-700 transition"
            >
              {t('more')}
            </div>

            {open && (
              <div
                className="absolute left-0 mt-2 w-32 bg-purple-700
                    shadow-lg rounded-xl border-2 z-50"
              >
                <button
                  onClick={() => {
                    navigate('/filter');
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2
                   hover:bg-purple-200 hover:text-purple-700
                   transition rounded-xl"
                >
                  {t('filter')}
                </button>
              </div>
            )}
          </li>
        </ul>
        <div
          className={` relative left-65 top-7 transition-all duration-1000 ${showSearch ? '-translate-y-30' : 'translate-y-0'}`}
        >
          <Search />
        </div>
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className={` relative top-0 text-2xl rounded-2xl text-shadow-xs text-shadow-black
       hover:text-purple-500 hover:bg-purple-200 text-gray-300 font-bold border border-black/0
        px-4 py-3 right-30 ${showSearch ? 'text-purple-800 border border-purple-700 bg-purple-200' : ''}`}
        >
          <FaSearch />
        </button>
        <div className="absolute top-5 right-4">
          <ThemeToggle />
        </div>
        <li className="relative right-50 list-none ">
          <LanguageSwitcher />
        </li>
        {error && <div className="text-red-700">{t('authError')}</div>}
        {isLoading ? (
          <div className="z-20">
            <span className="loader"></span>
          </div>
        ) : (
          <div
            className="absolute top-5 rounded-2xl shadow-xs
          shadow-black hover:bg-purple-800 text-gray-300
           hover:text-white font-bold bg-purple-700 px-4 py-2.5 right-20"
          >
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
