import axios from 'axios';

const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!token) {
  throw new Error('TMDB Access Token is missing in .env file');
}

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

export const getDiscoverMovies = async (): Promise<Movie[]> => {
  const res = await tmdbApi.get('/discover/movie', {
    params: {
      include_video: false,
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const getDiscoverTvShows = async (): Promise<TvShow[]> => {
  const res = await tmdbApi.get('/discover/tv', {
    params: {
      include_video: false,
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const fetchShownum = async (id: string): Promise<Movie[]> => {
  const res = await tmdbApi.get(`/tv/${id}?language=en-US`);
  return res.data.results;
};
