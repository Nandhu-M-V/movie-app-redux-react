import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3); // 0.3 controls speed
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
      <nav
        className="max-w-7xl
                      flex gap-24 items-center
                      h-20 text-white"
      >
        <h1
          className="text-4xl font-extrabold text-purple-700 text-shadow-xs hover:scale-105 text-shadow-black hover:text-purple-600 cursor-pointer"
          onClick={() => navigate('/Home')}
        >
          MovieApp
        </h1>

        <ul className="flex gap-10 text-lg font-semibold">
          <li
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={() => navigate('/movies/discover')}
          >
            Movies
          </li>

          <li
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={() => navigate('/tvshow/discover')}
          >
            TV Shows
          </li>

          <li className="cursor-pointer hover:text-blue-400 transition">
            Genres
          </li>

          <li className="cursor-pointer hover:text-blue-400 transition">
            More
          </li>
        </ul>
      </nav>
      <button className=" absolute top-4 rounded-2xl text-white bg-purple-700 px-8 py-3 right-15">
        {' '}
        login
      </button>
    </header>
  );
};

export default Header;
