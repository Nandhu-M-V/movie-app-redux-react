import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { updateMovie } from '../features/movies/movieSlice';
import { useState } from 'react';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const movie = useSelector((state: RootState) =>
    state.movie.movies.find((m) => m.id === Number(id))
  );

  const [title, setTitle] = useState(movie?.title || '');
  const [overview, setOverview] = useState(movie?.overview || '');
  const [tagline, setTagline] = useState(movie?.tagline || '');
  const [vote_average, setVote] = useState(movie?.vote_average || 0);
  const [release_date, setReleaseDate] = useState(movie?.release_date || '');

  if (!movie) return <p className="text-white p-10">Movie not found</p>;

  const handleSubmit = () => {
    const updatedFields = {
      id: movie.id,
      title,
      overview,
      release_date: release_date || '',
      vote_average: vote_average || 0,
    };

    dispatch(updateMovie(updatedFields));

    const stored = localStorage.getItem('editedMovies');
    const parsed = stored ? JSON.parse(stored) : {};

    parsed[movie.id] = {
      title,
      overview,
      tagline,
      release_date,
      vote_average,
    };

    localStorage.setItem('editedMovies', JSON.stringify(parsed));

    navigate('/movies/discover');
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black text-black dark:text-white flex justify-center pt-28 px-6">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-purple-600">Edit Movie</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Movie Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="overview" className="font-medium">
            Movie Overview
          </label>
          <textarea
            id="overview"
            rows={6}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tagline" className="font-medium">
            Movie Tagline
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="releaseDate" className="font-medium">
            Release Date
          </label>
          <input
            id="releaseDate"
            type="date"
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="voteAverage" className="font-medium">
            Vote Average
          </label>
          <input
            id="voteAverage"
            type="number"
            step="0.1"
            value={vote_average}
            onChange={(e) => setVote(Number(e.target.value))}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditMovie;
