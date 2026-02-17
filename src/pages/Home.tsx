import { fetchMovies } from '../features/movies/movieSlice';
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

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const randomSeed = useRef(Math.random());

  const randomMovie =
    movies.length > 0
      ? movies[Math.floor(randomSeed.current * movies.length)]
      : null;

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      {randomMovie?.backdrop_path && (
        <HomeBanner backdrop={randomMovie.backdrop_path} />
      )}

      <h2 className="font-extrabold text-4xl pl-5">Trending movies</h2>

      <div
        className="
            px-10 py-5
            grid grid-flow-col auto-cols-[220px]
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            snap-x
            scrollbar-hide
        "
      >
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <HomeCards movie={movie} />
          </div>
        ))}
      </div>
      <h2 className="font-extrabold text-4xl pl-5">Top TV Shows</h2>

      <div
        className="
            px-10 py-5
            grid grid-flow-col auto-cols-[220px]
            gap-1
            overflow-x-auto overflow-y-hidden
            scroll-smooth
            snap-x
            scrollbar-hide
        "
      >
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <HomeCards movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
