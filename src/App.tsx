import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MovieDetail from './pages/MovieDetails';
import TvDetail from './pages/TvDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="movies/discover" element={<Movies />} />
          <Route path="tvshow/discover" element={<TvShows />} />
          <Route index path="/home" element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="tv/:id" element={<TvDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
