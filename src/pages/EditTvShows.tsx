import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { updateTvShow } from '../features/Tvshows/tvshowSlice';
import { useState } from 'react';

const EditTvShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const tv = useSelector((state: RootState) =>
    state.tvshow.tvShows.find((t) => t.id === Number(id))
  );

  const [name, setName] = useState(tv?.name || '');
  const [overview, setOverview] = useState(tv?.overview || '');
  const [tagline, setTagline] = useState(tv?.tagline || '');
  const [vote_average, setVote] = useState(tv?.vote_average || 0);
  const [first_air_date, setFirstAirDate] = useState(tv?.first_air_date || '');

  if (!tv) return <p className="text-white p-10">TV Show not found</p>;

  const handleSubmit = () => {
    const updatedFields = {
      id: tv.id,
      name,
      overview,
      first_air_date: first_air_date || '',
      vote_average: vote_average || 0,
    };

    dispatch(updateTvShow(updatedFields));

    const stored = localStorage.getItem('editedTvShows');
    const parsed = stored ? JSON.parse(stored) : {};

    parsed[tv.id] = {
      name,
      overview,
      tagline,
      first_air_date,
      vote_average,
    };

    localStorage.setItem('editedTvShows', JSON.stringify(parsed));

    navigate('/tvshow/discover');
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black text-black dark:text-white flex justify-center pt-28 px-6">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-purple-600">Edit TV Show</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            TV Show Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 w-full rounded border border-black dark:border-purple-500 bg-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="overview" className="font-medium">
            TV Show Overview
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
            Tagline
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
          <label htmlFor="firstAirDate" className="font-medium">
            First Air Date
          </label>
          <input
            id="firstAirDate"
            type="date"
            value={first_air_date}
            onChange={(e) => setFirstAirDate(e.target.value)}
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

export default EditTvShow;
