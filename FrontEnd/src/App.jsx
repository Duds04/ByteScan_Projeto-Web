import "./App.css";
import { useParams, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import MangaPage from "./components/MangaPage"; 
import LoadingGame from "./components/LoadingGame";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Manga/:id"
          element={
            <MangaPage />
          }
        />
        <Route
          path="/404"
          element={<LoadingGame loading={false}/>}
        />
        {/* <Route path="/Pagina" element={<Pagina />} /> */}
      </Routes>
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
