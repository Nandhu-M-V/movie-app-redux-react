import { fetchTvShows } from '@/features/Tvshows/tvshowSlice';
import type { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import TvShowCard from '@/components/TvShowCard';
import Carousal from '@/components/Carousal';

const TvShows = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { tvShows, loading1, error1 } = useSelector(
    (state: RootState) => state.tvshow
  );

  useEffect(() => {
    if (tvShows.length === 0) dispatch(fetchTvShows());
  }, [dispatch, tvShows.length]);

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
    </div>
  );
};

export default TvShows;
