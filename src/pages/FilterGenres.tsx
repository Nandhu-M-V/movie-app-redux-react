import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { fetchGenres } from '@/features/genres/genreSlice';
import { useEffect } from 'react';

const FilterGenres = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { genres, genreLoading } = useSelector(
    (state: RootState) => state.genre
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (genreLoading) return <p>Loading...</p>;

  return (
    <div>
      {genres.map((genre) => (
        <span className="text-2xl text-white font-bold" key={genre.id}>
          {genre.name}
        </span>
      ))}
    </div>
  );
};

export default FilterGenres;
