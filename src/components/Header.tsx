import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="fixed left-10 top-0  px-3 rounded-2xl border border-gray-700 z-50
                       bg-linear-to-b from-black/90 to-transparent
                       backdrop-blur-lg"
    >
      <nav
        className="max-w-7xl mx-auto
                      flex items-center
                      justify-
                      h-20 px-6 text-white"
      >
        <h1
          className="text-3xl font-extrabold text-purple-700 text-shadow-xs hover:scale-105 text-shadow-white hover:text-purple-600 mr-10 cursor-pointer"
          onClick={() => navigate('/Home')}
        >
          MovieApp
        </h1>

        <ul className="flex gap-6 text-lg font-medium">
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

          <li
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={() => navigate('/genres')}
          >
            Genres
          </li>

          <li className="cursor-pointer hover:text-blue-400 transition">
            More
          </li>
        </ul>
      </nav>
      {/* <button className="bg-white absolute"> login</button> */}
    </header>
  );
};

export default Header;
