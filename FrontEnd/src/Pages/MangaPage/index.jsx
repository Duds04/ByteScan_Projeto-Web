import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import "../../styles/MangaPage.css";
import {
  Bookmark,
  User,
  Palette,
  Star,
  Tag,
  BookOpen,
  Clock,
  Calendar,
  Heart,
  Play,
  SkipForward
} from "lucide-react";
import LoadingGame from "../../components/LoadingGame";

import {
  getManga,
  avaliarObra,
  addFavorito,
  removeFavorito,
  handleRequest
} from "../../services/mangaService.js"; 


function MangaPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(null);
  const [favoritado, setFavoritado] = useState(false);

  // Mock de requisição ao servidor
  useEffect(() => {
    setLoading(true);
    setFavoritado(false);
    const stored = localStorage.getItem("auth");
    const token = stored ? JSON.parse(stored).token : "";

    async function fetchData() {
      try {
        const data = await getManga(token, id);

        console.log("Testeeeeeee ", data);
        console.log("Testeeeeeee2 ", data.manga);

        setManga({
          ...data.manga,
          generos: data.manga.genero.split(",").map((g) => g.trim()),
          autores: data.manga.autores.split(",").map((a) => a.trim()),
          artistas: data.manga.artistas.split(",").map((a) => a.trim()),
        });

        setFavoritado(data.favoritado);
        setUserRating(data.avaliacao?.nota ?? null);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Função para enviar avaliação ao backend 
  async function handleRating(newRating) {
    const stored = localStorage.getItem("auth");
    const token = stored ? JSON.parse(stored).token : "";

    try {
      await avaliarObra(token, id, newRating);
      setUserRating(newRating);
      alert(`Avaliação enviada: ${newRating} estrela(s)`);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      alert("Erro ao enviar avaliação.");
    }
  }

  // Função para favoritar manga
  async function handleFavorite() {
    const stored = localStorage.getItem("auth");
    const token = stored ? JSON.parse(stored).token : "";

    try {
      if (favoritado) {
        await removeFavorito(token, id);
        setManga((prev) => ({
          ...prev,
          quantidadeFavoritos: prev.quantidadeFavoritos - 1,
        }));
        setFavoritado(false);
        alert("Mangá desfavoritado com sucesso!");
      } else {
        await addFavorito(token, id);
        setManga((prev) => ({
          ...prev,
          quantidadeFavoritos: prev.quantidadeFavoritos + 1,
        }));
        setFavoritado(true);
        alert("Mangá favoritado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
      alert("Erro ao atualizar favorito.");
    }
  }

  function returnMangaCap(idCap) {
    navigate(`/manga/${id}/cap/${idCap}`, {
      state: { manga, favoritado },
    });
  }

  if (loading) return <LoadingGame />;
  if (!manga) return <div>Mangá não encontrado.</div>;

  return (
    <div className="manga-page">
      <div className="manga-title-container">
        <h1 className="manga-title">{manga.nome}</h1>
      </div>

      <div className="manga-card">
        <img
          src={manga.imagemCapa}
          alt={manga.nome}
          className="manga-card-img"
        />
        <div className="manga-card-info">
          <div className="rating-section">
            <Star className="rating-icon" />
            <b>Avaliação</b>
            <StarRating
              value={userRating !== null ? userRating : manga.avaliacao}
              onChange={handleRating}
              interactive={true}
            />
          </div>
          <p>
            <b><Tag size={16} className="info-icon" /> Gênero(s):</b> {manga.generos.join(", ")}
          </p>
          <p>
            <b><BookOpen size={16} className="info-icon" /> Tipo:</b> {manga.tipo}
          </p>
          <p>
            <b><Clock size={16} className="info-icon" /> Status:</b> {manga.status}
          </p>
          <p>
            <b><Calendar size={16} className="info-icon" /> Ano de Lançamento:</b> {manga.anoLancamento}
          </p>
          <p>
            <b><User size={16} className="info-icon" /> Autor(es):</b> {manga.autores.join(", ")}
          </p>
          <p>
            <b><Palette size={16} className="info-icon" /> Artista(s):</b> {manga.artistas.join(", ")}
          </p>
          <div className="nav-chapters">
            <div className="button-chapters-container">
              <button
                className="button-chapters"
                onClick={() => {
                  returnMangaCap(1);
                }}
              >
                <Play size={18} />
                Primeiro Capítulo
              </button>
              <button
                className="button-chapters"
                onClick={() => {
                  returnMangaCap(manga.idUltimoCapituloLancado);
                }}
              >
                <SkipForward size={18} />
                Último Capítulo
              </button>
            </div>
            <span className="bookmark-container">
              <button
                className={
                  favoritado ? "button-bookmark-disabled" : "button-bookmark"
                }
                onClick={() => {
                  handleFavorite();
                }}
                style={
                  favoritado ? { opacity: 0.5 } : {}
                }
              >
                <Heart fill={favoritado ? "#8a3cff" : "white"} size={50} />
              </button>
              {favoritado ? (
                <>
                  Você já favoritou <br /> este mangá!
                </>
              ) : (
                <>
                  {manga.quantidadeFavoritos} Usuários <br /> favoritaram
                </>
              )}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="manga-description">
        <h2 className="manga-description-title">Sinopse</h2>
        <p className="manga-description-text">{manga.descricao}</p>
      </div>

      <div className="manga-chapters">
        <h2 className="manga-chapter-title">
          <BookOpen className="chapter-title-icon" />
          Capítulos
        </h2>
        <div className="manga-chapters-list">
          {manga.capitulos.map((cap) => (
            <button
              key={cap.idCap}
              className="manga-chapters-item"
              onClick={() => {
                returnMangaCap(cap.idCap);
              }}
            >
              <div className="chapter-info">
                <BookOpen size={16} className="chapter-icon" />
                <span className="chapters-titulo">{cap.capitulo}</span>
              </div>
              <div className="chapter-date">
                <Calendar size={14} className="date-icon" />
                <span className="chapters-data">{cap.data}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaPage;