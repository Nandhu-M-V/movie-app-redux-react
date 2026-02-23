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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [title, setTitle] = useState(movie?.title || '');
  const [overview, setOverview] = useState(movie?.overview || '');
  const [tagline, setTagline] = useState(movie?.tagline || '');
  const [vote_average, setVote] = useState<number>(movie?.vote_average ?? 0);
  const [release_date, setReleaseDate] = useState(movie?.release_date || '');

  if (!movie) return <p className="text-white p-10">Movie not found</p>;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!overview.trim()) {
      newErrors.overview = 'Overview is required';
    }

    if (!release_date) {
      newErrors.release_date = 'Release date is required';
    } else {
      const selectedDate = new Date(release_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        newErrors.release_date = 'Release date cannot be in the future';
      }
    }

    if (isNaN(vote_average)) {
      newErrors.vote_average = 'Vote is required';
    } else if (vote_average < 0 || vote_average > 10) {
      newErrors.vote_average = 'Vote must be between 0 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const updatedFields = {
      id: movie.id,
      title,
      overview,
      release_date,
      vote_average,
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-purple-600">Edit Movie</h1>

        {/* TITLE */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Movie Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: '' }));
            }}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* OVERVIEW */}
        <div className="flex flex-col gap-2">
          <label htmlFor="overview" className="font-medium">
            Movie Overview
          </label>
          <textarea
            id="overview"
            rows={6}
            value={overview}
            onChange={(e) => {
              setOverview(e.target.value);
              setErrors((prev) => ({ ...prev, overview: '' }));
            }}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.overview && (
            <p className="text-red-500 text-sm">{errors.overview}</p>
          )}
        </div>

        {/* TAGLINE */}
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

        {/* RELEASE DATE */}
        <div className="flex flex-col gap-2">
          <label htmlFor="releaseDate" className="font-medium">
            Release Date
          </label>
          <input
            id="releaseDate"
            type="date"
            value={release_date}
            onChange={(e) => {
              setReleaseDate(e.target.value);
              setErrors((prev) => ({
                ...prev,
                release_date: '',
              }));
            }}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.release_date && (
            <p className="text-red-500 text-sm">{errors.release_date}</p>
          )}
        </div>

        {/* VOTE */}
        <div className="flex flex-col gap-2">
          <label htmlFor="voteAverage" className="font-medium">
            Vote Average
          </label>
          <input
            id="voteAverage"
            type="number"
            step="0.1"
            value={vote_average}
            onChange={(e) => {
              setVote(Number(e.target.value));
              setErrors((prev) => ({
                ...prev,
                vote_average: '',
              }));
            }}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.vote_average && (
            <p className="text-red-500 text-sm">{errors.vote_average}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
