import "../../styles/HomePage.css";
import HomeIntroduction from "./HomeIntroduction.jsx";
import HomeMangaList from "./HomeMangaList.jsx";
import LoadingGame from "../LoadingGame/index.jsx";
import { useState, useEffect } from "react";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [mangasUltimos, setMangasUltimos] = useState([]);
  const [mangasMaisLidos, setMangasMaisLidos] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMangasUltimos([
        {
          id: 1,
          imagemCapa: "/manga1.jpeg",
          nome: "A Crônica do Erudito",
          avaliacao: 3.5,
          capitulos: [
            { idCap: 100, capitulo: "Capítulo 100", data: "23 horas atrás" },
            { idCap: 98, capitulo: "Capítulo 98", data: "2024-12-20" },
          ],
        },
        {
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },
      ]);
      setMangasMaisLidos([
        {
          id: 1,
          imagemCapa: "/manga1.jpeg",
          nome: "A Crônica do Erudito",
          avaliacao: 3.5,
          capitulos: [
            { idCap: 100, capitulo: "Capítulo 100", data: "23 horas atrás" },
            { idCap: 98, capitulo: "Capítulo 98", data: "2024-12-20" },
          ],
        },
        {
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },{
          id: 2,
          imagemCapa: "/manga2.jpg",
          nome: "Nome Manga",
          avaliacao: 4.5,
          capitulos: [
            { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
            { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
          ],
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingGame />;

  return (
    <div className="home-container">
      <HomeIntroduction />
      <HomeMangaList title="Últimos Lançamentos" mangas={mangasUltimos} />
      <HomeMangaList title="Mais Lidos" mangas={mangasMaisLidos} />
    </div>
  );
}

export default HomePage;
