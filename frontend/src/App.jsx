import "./css/App.css";
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { AnimeProvider } from "./contexts/AnimeContext";
import NavBar from './components/NavBar';

function App() {
  return (
    <AnimeProvider>
      <NavBar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          
        </Routes>
      </main>
    </AnimeProvider>
  );
}

export default App;
