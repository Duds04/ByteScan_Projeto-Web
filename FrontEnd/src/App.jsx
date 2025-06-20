import "./App.css";
import { useParams, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import MangaPage from "./Pages/MangaPage";
import LoadingGame from "./components/LoadingGame";
import ChapterPage from "./Pages/ChapterPage";
import PrivateRoute from "./auth/PrivateRoute";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/Manga/:id"
            element={
              <PrivateRoute>
                <MangaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Manga/:id/Cap/:idCap"
            element={
              <PrivateRoute>
                <ChapterPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/404" element={<LoadingGame loading={false} />} />
          <Route path="/SearchPage" element={<SearchPage/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Wrapper para passar o id como prop

function MangaWrapper() {
  const { id } = useParams();
  return <Manga id={id} />;
}

export default App;
