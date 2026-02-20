import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import Search from './Search';
import './styles/styles.css';

import LoginButton from './login-signup/LoginButton';
import LogoutButton from './login-signup/LogoutButton';

import { useEffect, useState } from 'react';
import ThemeToggle from './DarkMode';

const Header = () => {
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
      <div
        className={` transition-all duration-1000 ${showSearch ? '-translate-y-30' : 'translate-y-0'}`}
      >
        <Search />
      </div>
      <nav
        className="max-w-7xl 
                      flex gap-20 items-center
                      h-20 text-white"
      >
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
            Movies
          </li>

          <li
            className={`cursor-pointer p-2 px-3 hover:bg-purple-200 rounded-2xl hover:text-purple-700 transition ${location.pathname === '/tvshow/discover' ? 'bg-purple-200 text-purple-700 border-2 border-purple-700' : ''} `}
            onClick={() => navigate('/tvshow/discover')}
          >
            TV Shows
          </li>

          <li className="cursor-pointer p-2 px-3 hover:bg-purple-200 rounded-2xl hover:text-purple-700 transition">
            More
          </li>
        </ul>
      </nav>

      <button
        onClick={() => setShowSearch((prev) => !prev)}
        className={` absolute top-4 text-2xl rounded-2xl text-shadow-xs text-shadow-black
       hover:text-purple-500 hover:bg-purple-200 text-gray-300 font-bold
        px-4 py-3 right-55 ${showSearch ? 'text-purple-800 border border-purple-700 bg-purple-200' : ''}`}
      >
        <FaSearch />
      </button>

      <div className="absolute top-5 right-4">
        <ThemeToggle />
      </div>

      {error && <div className="text-red-700"> Authentication Error</div>}

      {isLoading ? (
        <div className="z-20">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div
            className="absolute top-4 rounded-2xl shadow-xs
          shadow-black hover:bg-purple-800 text-gray-300
           hover:text-white font-bold bg-purple-700 px-8 py-3 right-20"
          >
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
