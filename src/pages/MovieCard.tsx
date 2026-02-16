export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div style={cardStyle}>
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />

      <h3>{movie.title}</h3>
      <p>
        <strong>Release:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>

      <p style={{ fontSize: '14px' }}>{movie.overview.substring(0, 120)}...</p>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  width: '250px',
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

export default MovieCard;
