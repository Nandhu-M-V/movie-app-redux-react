import { fetchMovies } from '../features/movies/movieSlice';
import type { AppDispatch, RootState } from '../app/store';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import Carousal from '@/components/Carousal';

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Carousal movies={movies} />

      <div className="px-10 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-y-20 gap-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
