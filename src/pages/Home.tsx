import { fetchMovies } from '../features/movies/movieSlice';
import { fetchTvShows } from '@/features/Tvshows/tvshowSlice';
import type { AppDispatch, RootState } from '../app/store';
// import MovieCard from '../components/MovieCard';
// // import HeroBanner from '../components/HeroBanner';
import HomeBanner from '@/components/HomeBanner';
import Loading from '@/components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import HomeCards from '@/components/Homecards';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const IMAGE_BANNER_URL = 'https://image.tmdb.org/t/p/original';

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  const { tvShows, loading1, error1 } = useSelector(
    (state: RootState) => state.tvshow
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTvShows());
  }, [dispatch]);

  const randomSeed = useRef(Math.random());

  const randomMovie =
    movies.length > 0
      ? movies[Math.floor(randomSeed.current * movies.length)]
      : null;

  if (loading) return <Loading />;
  if (loading1) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (error1) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" min-h-screen pl-20 text-white">
      {randomMovie?.backdrop_path && (
        <img
          src={`${IMAGE_BANNER_URL}${randomMovie.backdrop_path}`}
          className="w-full left-0 -z-10 blur-3xl fixed h-full object-cover rounded-4xl"
          alt="movie backdrop"
        />
      )}
      {randomMovie?.backdrop_path && (
        <HomeBanner backdrop={randomMovie.backdrop_path} />
      )}

      <h2 className="font-extrabold relative z-10 pb-4 text-4xl">Movies</h2>

      <div
        className="
            px-10 py-5
            grid grid-flow-col auto-cols-[220px]
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            snap-x
            scrollbar-hide
            mb-5
        "
      >
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <HomeCards movie={movie} />
          </div>
        ))}
      </div>

      <h2 className=" font-extrabold py-4 text-4xl">TV Shows</h2>

      <div
        className="
            px-10 py-5
            grid grid-flow-col auto-cols-[220px]
            gap-1
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            snap-x
            scrollbar-hide
            mb-15
        "
      >
        {tvShows.map((movie) => (
          <div key={movie.id} className="snap-start">
            <HomeCards movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
