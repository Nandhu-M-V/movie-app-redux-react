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
  overview: string;
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

export const getDiscoverTvShows = async (): Promise<Movie[]> => {
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
