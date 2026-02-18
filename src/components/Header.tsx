import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Search from './Search';

import { useEffect, useState } from 'react';

const Header = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  console.log(showSearch);

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
      className=" fixed w-full max-w-460 left-10 top-0 px-3 rounded-b-2xl bg-gray-600/50
      border-b shadow-black/50 shadow-2xl border-purple-700 z-50 backdrop-blur-lg
      transition-transform duration-75 will-change-transform
      "
    >
      <div
        className={` transition-all duration-500 ${showSearch ? '-translate-y-30' : 'translate-y-0'}`}
      >
        <Search />
      </div>
      <nav
        className="max-w-7xl
                      flex gap-24 items-center
                      h-20 text-white"
      >
        <h1
          className={`text-4xl font-extrabold text-purple-700 text-shadow-xs hover:scale-105 text-shadow-black hover:text-purple-600 cursor-pointer `}
          onClick={() => navigate('/Home')}
        >
          MovieApp
        </h1>

        <ul className="flex gap-10 text-lg font-semibold">
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
            Genres
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
      <button className=" absolute top-4 rounded-2xl shadow-xs shadow-black hover:bg-purple-800 text-gray-300 hover:text-white font-bold bg-purple-700 px-8 py-3 right-15">
        login
      </button>
    </header>
  );
};

export default Header;
