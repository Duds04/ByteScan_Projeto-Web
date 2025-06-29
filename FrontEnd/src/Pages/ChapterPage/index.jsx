import "../../styles/ChapterPage.css";
import LoadingGame from "../../components/LoadingGame";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Bookmark,
  BookOpen,
  Home,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function ChapterPage() {
  const navigate = useNavigate();
  const { id, idCap } = useParams();
  const location = useLocation();
  const [manga, setManga] = useState(location.state?.manga || null); // Se manga não estiver no state, inicia como null
  const [favoritado, setFavoritado] = useState(
    location.state?.favoritado || false
  ); // Se favoritado não estiver no state, inicia como false

  const [capitulo, setCapitulo] = useState(null);
  const [loading, setLoading] = useState(true);

  function returnMangaPage() {
    navigate(`/manga/${id}`);
  }
  function returnPrevCap() {
    if (idCap == 0) {
      alert("Você já está no primeiro capítulo!");
      return;
    }
    navigate(`/manga/${id}/cap/${parseInt(idCap) - 1}`);
  }

  function returnNextCap() {
    if (parseInt(idCap) == parseInt(manga.idUltimoCapituloLancado)) {
      alert("Você já está no último capítulo!");
      return;
    }
    navigate(`/manga/${id}/cap/${parseInt(idCap) + 1}`);
  }

  // Vai pegar o capitulo do manga passado como param
  useEffect(() => {
    // Simula um mock
    setTimeout(() => {
      // Simulação de requisição ao backend
      // fetch(`/api/manga/${id}/cap/${idCap}`, { method: 'GET' })
      //   .then(...)
      //   .catch(...)
      // Retornaria o capitulo
      // Mock dos dados retornados do backend
      const mockCapitulo = {
        idManga: id, // idManga
        idCap,
        capitulo: "Capítulo 1", // Simboliza o nome do cap
        data: "10/05/2025",
        imagensCapitulo: [
          "https://s3.yomucomics.com/uploads/media/001.jpg",
          "https://s3.yomucomics.com/uploads/media/002.jpg",
          "https://s3.yomucomics.com/uploads/media/003.jpg",
          "https://s3.yomucomics.com/uploads/media/004.jpg",
        ],
      };
      // Simula verificação no backend se já favoritou
      // fetch(`/api/manga/${id}/favoritado`, { method: 'GET' })
      //   .then(res => res.json()).then(data => setFavoritado(data.favoritado));

      setCapitulo({
        ...mockCapitulo
      });

      if (manga === null) {
        // Faz requisição pro back pra pegar o manga a partir do seu id
        // fetch(`/api/manga/${id}`, { method: 'GET' })
        setManga({
          id,
          nome: "A Crônica do Erudito",
          imagemCapa: "/manga1.jpeg",
          descricao: "Um mangá de aventura e magia.",
          generos: ["Terror", "Ação"],
          tipo: "Manhua",
          status: "Em Andamento",
          avaliacao: 4.5,
          anoLancamento: 2025,
          quantidadeFavoritos: 1000,
          autores: ["Autor Exemplo", "Ataide Jr"],
          artistas: ["Artista Exemplo", "Tarik Segundo"],
          ultimoCapituloLancado: 3, // passa o id
          capitulos: [
            { idCap: 1, capitulo: "Capítulo 1", data: "10/05/2025" },
            { idCap: 2, capitulo: "Capítulo 2", data: "10/05/2025" },
            { idCap: 3, capitulo: "Capítulo 2", data: "10/05/2025" },
          ],
          idUltimoCapituloLancado: 3, // passa o id
        });
      }
    }, 400);

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/manga/${id}/capitulo/${idCap}`);
        setCapitulo(await res.json());
        if (manga === null) {
          const res = await fetch(`http://localhost:5000/api/manga/obras/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          setManga(await res.json());
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
    setLoading(false);
  }, [id, idCap]); 

  function ControlerCapitulo() {
    return (
      <div className="chapter-controler">
        <select
          value={capitulo.idCap}
          onChange={(e) => navigate(`/Manga/${id}/cap/${e.target.value}`)}
          className="chapter-select"
        >
          {manga.capitulos.map((cap) => (
            <option key={cap.idCap} value={cap.idCap}>
              Capítulo {cap.idCap}
            </option>
          ))}
        </select>

        <div className="chapter-controler-buttons">
          <button
            className={
              parseInt(idCap) === 0 ? "prev-disable" : "chapter-button"
            }
            disabled={parseInt(idCap) === 0 ? true : false}
            onClick={() => {
              returnPrevCap();
            }}
          >
            <ChevronLeft size={18} />
            Anterior
          </button>
          <button
            className={
              parseInt(idCap) == parseInt(manga.idUltimoCapituloLancado)
                ? "prev-disable"
                : "chapter-button"
            }
            disabled={
              parseInt(idCap) == parseInt(manga.idUltimoCapituloLancado)
                ? true
                : false
            }
            onClick={() => {
              returnNextCap();
            }}
          >
            Próximo
            <ChevronRight size={18} />
          </button>
          <button
            className="chapter-button"
            onClick={() => {
              returnMangaPage();
            }}
          >
            <Info size={18} />
            Manga Info
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingGame />;
  if (!capitulo) return <div>Capítulo não encontrado!</div>;
  if (!manga) return <div> {manga} Manga não encontrado!</div>;
  return (
    <div className="chapter-container">
      <div className="chapter-header">
        <div className="breadcrumb-nav">
          <Home size={16} className="breadcrumb-icon" />
          <a href="">Home</a>
          <span>/</span>
          <BookOpen size={16} className="breadcrumb-icon" />
          <a href="">{manga.nome}</a>
          <span>/</span>
          <Eye size={16} className="breadcrumb-icon" />
          <a href="">{capitulo.capitulo}</a>
        </div>
        <button
          className={favoritado ? "chapter-bookmark-btn-ativado" : "chapter-bookmark-btn"}
          onClick={() => setFavoritado((f) => !f)}
          aria-label={favoritado ? "Desfavoritar" : "Favoritar"}
        >
          <Heart
            color={favoritado ? "#a251fe" : "#252562"}
            fill={favoritado ? "#a251fe" : "transparent"}
            strokeWidth={2.5}
            size={23}
          />
        </button>
      </div>
      {ControlerCapitulo()}
      <div className="chapter-images-container">
        {capitulo.imagensCapitulo && capitulo.imagensCapitulo.length > 0 ? (
          capitulo.imagensCapitulo.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Página ${idx + 1}`}
              className="chapter-imagem-item"
            />
          ))
        ) : (
          <div>Nenhuma imagem disponível para este capítulo.</div>
        )}
      </div>
      {ControlerCapitulo()}
      <ScrollToTopButton />
    </div>
  );
}

export default ChapterPage;
