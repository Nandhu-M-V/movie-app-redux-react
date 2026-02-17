import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import tvReducer from '../features/Tvshows/tvshowSlice';
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tvshow: tvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
