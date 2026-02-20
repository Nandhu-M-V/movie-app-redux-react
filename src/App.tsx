import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MovieDetail from './pages/MovieDetails';
import TvDetail from './pages/TvDetail';
import EditMovie from './pages/EditMovies';
import EditTvShow from './pages/EditTvShows';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="movies/discover" element={<Movies />} />
          <Route path="tvshow/discover" element={<TvShows />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="movies/edit/:id" element={<EditMovie />} />
          <Route path="tvshow/edit/:id" element={<EditTvShow />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="tv/:id" element={<TvDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
