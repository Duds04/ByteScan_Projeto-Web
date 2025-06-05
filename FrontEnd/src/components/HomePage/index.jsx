import "../../styles/HomePage.css";
import HomeIntroduction from "./HomeIntroduction.jsx";
import HomeMangaList from "./HomeMangaList.jsx";

function HomePage() {
  const mangas_ultimos = [
    {
      id: 1,
      imagemCapa: "/manga1.jpeg",
      nome: "A Crônica do Erudito",
      avaliacao: 3.5,
      lancamento: [
        { idCap: 100, capitulo: "Capítulo 100", data: "23 horas atrás" },
        { idCap: 98, capitulo: "Capítulo 98", data: "2024-12-20" },
      ],
    },
    {
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },
  ];

  const mangas_mais_lidos = [
    {
      id: 1,
      imagemCapa: "/manga1.jpeg",
      nome: "A Crônica do Erudito",
      avaliacao: 3.5,
      lancamento: [
        { idCap: 100, capitulo: "Capítulo 100", data: "23 horas atrás" },
        { idCap: 98, capitulo: "Capítulo 98", data: "2024-12-20" },
      ],
    },
    {
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },{
      id: 2,
      imagemCapa: "/manga2.jpg",
      nome: "Nome Manga",
      avaliacao: 4.5,
      lancamento: [
        { idCap: 97, capitulo: "Capítulo 97", data: "2024-12-15" },
        { idCap: 96, capitulo: "Capítulo 96", data: "2024-12-10" },
      ],
    },
  ];
  
  return (
    <div className="home-container">
      <HomeIntroduction />
      <HomeMangaList title="Últimos Lançamentos" mangas={mangas_ultimos} />
      <HomeMangaList title="Mais Lidos" mangas={mangas_mais_lidos} />
    </div>
  );
}

export default HomePage;
