import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import type { SimilarMovie } from '@/utils/ApiFetch';
import { useAuth0 } from '@auth0/auth0-react';

import { fetchMovieid, fetchSimilarMovies } from '@/utils/ApiFetch';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface MovieDetailType {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  const [similar, setSimilar] = useState<SimilarMovie[]>([]);

  const navigate = useNavigate();

  const { user } = useAuth0();
  const roles = user?.['http://localhost:5002/roles'];

  useEffect(() => {
    if (!id) return;

    const getShow = async () => {
      try {
        setLoading(true);

        const data = await fetchMovieid(id);
        const similarData = await fetchSimilarMovies(id);

        const stored = localStorage.getItem('editedMovies');
        const parsed = stored ? JSON.parse(stored) : {};

        if (parsed[id]) {
          setMovie({
            ...data,
            ...parsed[id],
          });
        } else {
          setMovie(data);

          parsed[id] = data;
          localStorage.setItem('editedMovies', JSON.stringify(parsed));
        }

        setSimilar(similarData);
      } catch (error) {
        console.error(error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getShow();
  }, [id]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  if (loading) return <Loading />;
  if (!movie)
    return (
      <div className="text-white text-4xl absolute z-10 p-10">
        Movie not found!!
      </div>
    );

  const year = movie.release_date?.split('-')[0];

  return (
    <div className="text-white pt-20 bg-black min-h-screen">
      <div
        className="relative h-[70vh] bg-cover bg-top"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative -mt-40 px-6 md:px-16 flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-xl shadow-2xl"
        />

        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 italic mt-2">{movie.tagline}</p>

          <div className="flex gap-4 mt-4 text-sm text-gray-300">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{year}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="flex gap-6 mt-8 items-center flex-wrap">
            {movie.production_companies.map(
              (company) =>
                company.logo_path && (
                  <img
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-10 object-contain opacity-80"
                  />
                )
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!roles || !roles.includes('Admin')) {
                alert('You do not have permission to edit this page.');
                return;
              }
              navigate(`/movies/edit/${movie.id}`);
            }}
            className={`absolute bottom-0 left-1/2 z-10
                   bg-purple-600 hover:bg-purple-700
                   px-3 py-3 rounded-md
                   text-sm font-semibold
                   transition ${roles && roles.includes('Admin') ? '' : 'hidden'}`}
          >
            Edit Page
          </button>
        </div>
      </div>
      {/* similars --- */}
      <div className="px-6 md:px-16 mt-16 pb-20">
        <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {similar.map((movie) => (
            <div
              key={movie.id}
              className="min-w-40 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-lg hover:scale-105 transition"
                />
              )}
              <p className="mt-2 text-sm">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
