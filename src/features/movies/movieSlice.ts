import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDiscoverMovies } from '../../utils/ApiFetch';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

interface MovieState {
  loading: boolean;
  movies: Movie[];
  error: string;
}

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: '',
};

// Async thunk
export const fetchMovies = createAsyncThunk<Movie[]>(
  'movie/fetchMovies',
  async () => {
    const response = await getDiscoverMovies();
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      });
  },
});

export default movieSlice.reducer;
