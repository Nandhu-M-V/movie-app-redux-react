import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Genre {
  id: number;
  name: string;
}

interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

interface Network {
  id: number;
  name: string;
  logo_path: string | null;
}

interface Season {
  id: number;
  name: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
}

interface TvDetailType {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  genres: Genre[];
  created_by: Creator[];
  networks: Network[];
  seasons: Season[];
}

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const TvDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<TvDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchShow = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: 'application/json',
            },
          }
        );

        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!show) return <div className="text-white p-10">Show not found</div>;

  const year = show.first_air_date?.split('-')[0];

  return (
    <div className="text-white bg-black min-h-screen">
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative -mt-40 px-6 md:px-16 flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="w-64 rounded-xl shadow-2xl"
        />

        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">{show.name}</h1>
          <p className="text-gray-400 italic mt-2">{show.tagline}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
            <span>⭐ {show.vote_average.toFixed(1)}</span>
            <span>{year}</span>
            <span>{show.number_of_seasons} Seasons</span>
            <span>{show.number_of_episodes} Episodes</span>
            {show.episode_run_time[0] && (
              <span>{show.episode_run_time[0]} min</span>
            )}
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {show.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">{show.overview}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Created By</h3>
            <div className="flex gap-6 flex-wrap">
              {show.created_by.map((creator) => (
                <div key={creator.id} className="text-sm">
                  <p>{creator.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6 mt-6 items-center">
            {show.networks.map(
              (network) =>
                network.logo_path && (
                  <img
                    key={network.id}
                    src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                    alt={network.name}
                    className="h-10 object-contain opacity-80"
                  />
                )
            )}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 mt-16">
        <h2 className="text-2xl font-bold mb-6">Seasons</h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {show.seasons
            .filter((season) => season.season_number !== 0)
            .map((season) => (
              <div key={season.id} className="min-w-45">
                {season.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                    alt={season.name}
                    className="rounded-lg shadow-lg"
                  />
                )}
                <p className="mt-2 text-sm">{season.name}</p>
                <p className="text-gray-400 text-xs">
                  {season.episode_count} Episodes
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TvDetail;
