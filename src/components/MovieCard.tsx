export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  release_date?: string;
  vote_average?: number;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div
      className="group relative w-62 h-95 snap-start
                 rounded-2xl overflow-hidden
                 transform transition-all duration-500
                 hover:scale-105 hover:-translate-y-1
                 hover:shadow-2xl hover:shadow-black/40"
    >
      <img
        className="w-full h-full object-cover"
        src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ''}
        alt={movie.title}
      />

      <div
        className="absolute inset-0 bg-black/80
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-500
                   flex flex-col justify-end p-4 text-white"
      >
        <h3 className="font-bold text-lg">{movie.title}</h3>

        {movie.release_date && (
          <p className="text-sm text-gray-300">{movie.release_date}</p>
        )}

        {movie.vote_average && (
          <p className="text-sm text-yellow-400">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
