import { fetchTvShows } from '@/features/Tvshows/tvshowSlice';
import type { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import TvShowCard from '@/components/TvShowCard';
import Carousal from '@/components/Carousal';
import { useTranslation } from 'react-i18next';

const TvShows = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { i18n } = useTranslation();

  const { tvShows, loading1, error1 } = useSelector(
    (state: RootState) => state.tvshow
  );

  const [page, setpage] = useState(1);

  useEffect(() => {
    if (tvShows.length === 0) {
      dispatch(fetchTvShows(page));
    }
  }, [dispatch, page, i18n.language, tvShows.length]);

  function newPage(newpage: number) {
    setpage(newpage);
    dispatch(fetchTvShows(newpage));
  }

  if (loading1) return <Loading />;
  if (error1) return <p className="text-red-500">{error1}</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Carousal movies={tvShows} />

      <div className="px-10 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-y-20 gap-10">
        {tvShows.map((show) => (
          <TvShowCard key={show.id} movie={show} />
        ))}
      </div>
      <div className="w-full flex justify-center mb-10">
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => newPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
      ${
        page === 1
          ? 'bg-gray-400 cursor-not-allowed opacity-60'
          : 'bg-purple-700 hover:bg-purple-800 active:scale-95'
      }
      text-white shadow-md`}
          >
            Prev
          </button>

          <span className="text-white font-semibold">Page {page}</span>

          <button
            onClick={() => newPage(page + 1)}
            className="px-4 py-2 rounded-lg font-medium bg-purple-700
               hover:bg-purple-800 active:scale-95
               text-white shadow-md transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TvShows;
