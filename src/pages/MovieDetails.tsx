import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

interface MovieDetailType {
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

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: 'application/json',
            },
          }
        );

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!movie) return <div className="text-white p-10">Movie not found</div>;

  const year = movie.release_date?.split('-')[0];

  return (
    <div className="text-white bg-black min-h-screen">
      {/* Hero */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
