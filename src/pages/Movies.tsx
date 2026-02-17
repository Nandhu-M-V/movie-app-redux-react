import { fetchMovies } from '../features/movies/movieSlice';
import type { AppDispatch, RootState } from '../app/store';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import { useEffect, useMemo } from 'react';
import Loading from '@/components/Loading';

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const randomMovie = useMemo(() => {
    if (movies.length === 0) return null;
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-black min-h-screen px-20 text-white">
      {randomMovie && <HeroBanner backdrop={randomMovie.backdrop_path} />}

      <div className="px-10 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
