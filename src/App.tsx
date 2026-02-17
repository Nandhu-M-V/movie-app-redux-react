import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="movies/discover" element={<Movies />} />
          <Route path="Home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
