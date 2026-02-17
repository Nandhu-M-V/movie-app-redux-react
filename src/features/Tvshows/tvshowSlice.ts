import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDiscoverTvShows } from '../../utils/ApiFetch';

export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

interface TvShowState {
  loading1: boolean;
  tvShows: TvShow[];
  error1: string;
}

const initialState: TvShowState = {
  loading1: false,
  tvShows: [],
  error1: '',
};

// Async thunk
export const fetchTvShows = createAsyncThunk<TvShow[]>(
  'tvShow/fetchTvShows',
  async () => {
    const response = await getDiscoverTvShows();
    return response;
  }
);

const tvSlice = createSlice({
  name: 'tvshow',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShows.pending, (state) => {
        state.loading1 = true;
        state.error1 = '';
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.loading1 = false;
        state.tvShows = action.payload;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.error.message ?? 'Error';
      });
  },
});

export default tvSlice.reducer;
