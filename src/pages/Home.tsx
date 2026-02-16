import { fetchMovies } from '../features/movies/movieSlice';
import type { AppDispatch, RootState } from '../app/store';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    // <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    //   {movies.map((movie) => (
    //     <MovieCard key={movie.id} movie={movie} />
    //   ))}
    // </div>
    <></>
  );
};

export default Home;
