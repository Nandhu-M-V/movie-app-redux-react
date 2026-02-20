import { useEffect, useState, useMemo } from 'react';
import { fetchMovies } from '../features/movies/movieSlice';
import type { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FilterResultsPage = () => {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  const dispatch = useDispatch<AppDispatch>();

  console.log('Movies:', movies);

  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(0);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovies(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (movies.length === 0) {
      console.log(loading, error);
    }
  }, [movies.length, loading, error]);

  const filteredData = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesRating = (movie.vote_average ?? 0) >= minRating;

      return matchesSearch && matchesRating;
    });
  }, [movies, search, minRating]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black text-black dark:text-white">
      <aside className="w-72 bg-white dark:bg-gray-900 pt-30 p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Search</label>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Minimum Rating
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 outline-none"
          >
            <option value={0}>All</option>
            <option value={5}>5+</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
          </select>
        </div>
      </aside>

      <main className="pt-30 flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">
          Results ({filteredData.length})
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {filteredData.map((movie) => (
            <div
              onClick={() => navigate(`/movie/${movie.id}`)}
              key={movie.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 flex items-center justify-center bg-gray-300 dark:bg-gray-800">
                  <span>No Image</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>

                <p className="text-sm text-gray-500">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <p className="text-sm text-gray-500">{movie.release_date}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Previous
            </button>

            <span className="px-4 py-2">Page {page}</span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-purple-600 rounded"
            >
              Next
            </button>
          </div>
        </div>

        {filteredData.length === 0 && !loading && (
          <p className="text-gray-500 mt-6">No results found.</p>
        )}
      </main>
    </div>
  );
};

export default FilterResultsPage;
