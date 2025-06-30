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
  ChevronRight,
} from "lucide-react";

import {
  getObraCompleta,
  getCapitulo,
  getIsFav,
  addFavorito,
  removeFavorito,
} from "../../services/mangaService.js";

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
    if (idCap == 1) {
      alert("Você já está no primeiro capítulo!");
      return;
    }
    navigate(`/manga/${id}/cap/${parseInt(idCap) - 1}`);
  }

  function returnNextCap() {
    if (parseInt(idCap) == parseInt(manga.ultimoCapituloLancado)) {
      alert("Você já está no último capítulo!");
      navigate(`/manga/${id}`);
      return;
    }
    navigate(`/manga/${id}/cap/${parseInt(idCap) + 1}`);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const token = localStorage.getItem("auth");

      try {
        // Buscar capítulo real
        const cap = await getCapitulo(id, idCap);
        setCapitulo(cap);

        // Buscar dados do mangá, se ainda não estiverem disponíveis
        if (!manga) {
          const m = await getObraCompleta(id, token);
          setManga(m);
        }

        // Ver se já está favoritado
        const fav = await getIsFav(token, id);
        setFavoritado(fav.favoritado);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar capítulo ou mangá.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
              Capítulo {cap.numero}
            </option>
          ))}
        </select>

        <div className="chapter-controler-buttons">
          <button
            className={
              parseInt(idCap) === 1 ? "prev-disable" : "chapter-button"
            }
            disabled={parseInt(idCap) === 1 ? true : false}
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
          <a href="" onClick={() => navigate("/")}>Home</a>
          <span>/</span>
          <BookOpen size={16} className="breadcrumb-icon" />
          <a href="" onClick={() => returnMangaPage()}>{manga.nome}</a>
          <span>/</span>
          <Eye size={16} className="breadcrumb-icon" />
          <a >{capitulo.capitulo}</a>
        </div>
        <button
          className={
            favoritado ? "chapter-bookmark-btn-ativado" : "chapter-bookmark-btn"
          }
          onClick={async () => {
            const stored = localStorage.getItem("auth");
            const token = stored ? JSON.parse(stored).token : "";

            try {
              if (favoritado) {
                await removeFavorito(token, id);
                setFavoritado(false);
              } else {
                await addFavorito(token, id);
                setFavoritado(true);
              }
            } catch (err) {
              console.error("Erro ao atualizar favorito:", err);
              alert("Erro ao atualizar favorito");
            }
          }}
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
