import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 w-fit px-10 rounded-2xl border border-gray-800 z-50
                       bg-linear-to-b from-black/90 to-transparent
                       backdrop-blur-md"
    >
      <nav
        className="max-w-7xl mx-auto
                      flex items-center
                      h-20 px-6 text-white"
      >
        <h1
          className="text-3xl font-extrabold text-blue-600 hover:text-white mr-10 cursor-pointer"
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
    </header>
  );
};

export default Header;
