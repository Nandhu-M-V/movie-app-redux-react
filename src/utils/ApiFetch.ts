import axios from 'axios';
import i18n from './i18n';

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

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}

export const fetchMovieGenres = async (): Promise<Genre[]> => {
  const res = await tmdbApi.get('/genre/movie/list');
  return res.data.genres;
};

export const getDiscoverMovies = async (page: number): Promise<Movie[]> => {
  const res = await tmdbApi.get('/trending/movie/week', {
    params: {
      include_video: false,
      language: i18n.language,
      page,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const getDiscoverTvShows = async (page: number): Promise<TvShow[]> => {
  const res = await tmdbApi.get('/trending/tv/week', {
    params: {
      include_video: false,
      language: i18n.language,
      page,
      sort_by: 'popularity.desc',
    },
  });

  return res.data.results;
};

export const fetchShowid = async (id: string): Promise<TvDetailType> => {
  const res = await tmdbApi.get(`/tv/${id}`, {
    params: { language: i18n.language },
  });

  return res.data;
};

export const fetchMovieid = async (id: string): Promise<MovieDetailType> => {
  const res = await tmdbApi.get(`/movie/${id}`, {
    params: { language: i18n.language },
  });

  return res.data;
};

export const fetchSimilarMovies = async (
  id: string
): Promise<SimilarMovie[]> => {
  const res = await tmdbApi.get(`/movie/${id}/similar`, {
    params: { language: i18n.language, page: 1 },
  });

  return res.data.results;
};
