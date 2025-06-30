import "../../styles/HomePage.css";
import HomeIntroduction from "./HomeIntroduction.jsx";
import HomeMangaList from "./HomeMangaList.jsx";
import LoadingGame from "../../components/LoadingGame/index.jsx";
import { useState, useEffect } from "react";

import {
  getObras,
  getMaisFavoritados
} from "../../services/mangaService.js"; 

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [mangasUltimos, setMangasUltimos] = useState([]);
  const [mangasMaisLidos, setMangasMaisLidos] = useState([]);
  

  useEffect(() => {
    setLoading(true);
     async function fetchData() {
          try {
            const data = await getObras();
            const data_mais_fav = await getMaisFavoritados();
            setMangasUltimos(data);
            setMangasMaisLidos(data_mais_fav);
          } catch (error) {
            console.error("Erro ao buscar dados:", error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      setLoading(false);
  }, []);

  if (loading) return <LoadingGame />;

  return (
    <div className="home-container">
      <HomeIntroduction />
      <HomeMangaList title="Últimos Lançamentos" mangas={mangasUltimos} />
      <HomeMangaList title="Mais Relevantes" mangas={mangasMaisLidos} />
    </div>
  );
}

export default HomePage;
