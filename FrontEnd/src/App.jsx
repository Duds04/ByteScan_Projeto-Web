import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import MangaPage from "./Pages/MangaPage";
import LoadingGame from "./components/LoadingGame";
import ChapterPage from "./Pages/ChapterPage";
import PrivateRoute from "./auth/PrivateRoute";
import SearchPage from "./Pages/SearchPage";
import Faq from "./components/Faq";
import FavoritosPage from "./Pages/FavoritosPage";  

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/manga/:id"
            element={
              <PrivateRoute>
                <MangaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/manga/:id/cap/:idCap"
            element={
              <PrivateRoute>
                <ChapterPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/Favoritos"
            element={
              <PrivateRoute>
                <FavoritosPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/faq" element={<Faq />} />
          <Route path="/404" element={<LoadingGame loading={false} />} />
          <Route path="/buscar" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
