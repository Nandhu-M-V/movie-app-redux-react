import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import './styles/styles.css';

import type { BaseMedia } from './TvShowCard';

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BaseMedia[]>([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const fetchMovies = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: 'application/json',
          },
        }
      );

      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchMovies();
    }
  };
  const handleClick = () => {
    fetchMovies();
  };

  const handleSelect = (type: string, id: number) => {
    if (type.toLowerCase() === 'movie') {
      navigate(`/movie/${id}`);
    } else if (type.toLowerCase() === 'tv') {
      navigate(`/tv/${id}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="absolute right-0 top-3 -translate-x-1/2 z-20 w-[90vw] max-w-2xl"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search Movies, TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-15 pl-14 pr-6 rounded-full
                     bg-gray-600/50 backdrop-blur-md border border-gray-700
                     text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-purple-600
                     transition-all duration-300"
        />

        <button
          onClick={handleClick}
          className="relative bottom-14.5 transition-all duration-200 left-135 text-white shadow-xs shadow-black hover:bg-purple-800 font-bold bg-purple-700 rounded-full px-10 p-4"
        >
          search
        </button>
      </div>

      {loading && (
        <div className="flex flex-col relative items-center">
          <span className="loader"></span>
        </div>
      )}

      {results.length > 0 && (
        <div className=" bg-black/90 backdrop-blur-lg relative bottom-11 rounded-xl max-h-96 overflow-y-auto shadow-2xl border border-gray-800">
          {results.slice(0, 8).map((item) => (
            <div
              onClick={() => handleSelect(item.media_type || 'movie', item.id)}
              key={item.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-800 transition cursor-pointer"
            >
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-12 rounded-md"
                />
              )}

              <div>
                <p className="text-white font-medium">
                  {item.title || item.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.media_type?.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
