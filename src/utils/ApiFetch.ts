import axios from 'axios';

import type { TvDetailType } from '@/pages/TvDetail';
import type { MovieDetailType } from '@/pages/MovieDetails';

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

export interface Genre {
  id: number;
  name: string;
}

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

export const fetchMovieGenres = async (): Promise<Genre[]> => {
  const res = await tmdbApi.get('/genre/movie/list');
  return res.data.genres;
};

export const getDiscoverMovies = async (page = 1): Promise<Movie[]> => {
  const res = await tmdbApi.get('/discover/movie', {
    params: {
      include_video: false,
      language: 'en-US',
      page,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const getDiscoverTvShows = async (page = 1): Promise<TvShow[]> => {
  const res = await tmdbApi.get('/discover/tv', {
    params: {
      include_video: false,
      language: 'en-US',
      page,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const fetchShowid = async (id: string): Promise<TvDetailType> => {
  const res = await tmdbApi.get(`/tv/${id}`, {
    params: { language: 'en-US' },
  });

  return res.data;
};

export const fetchMovieid = async (id: string): Promise<MovieDetailType> => {
  const res = await tmdbApi.get(`/movie/${id}`, {
    params: { language: 'en-US' },
  });

  return res.data;
};
