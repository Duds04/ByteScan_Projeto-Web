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

export const getManga = async () => {
  const response = await fetch("http://localhost:5000/api/manga/categorias", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return await response.json();
};


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
    setFavoritado(false); // reset ao trocar de manga
     async function fetchData() {
      try {
        const manga = await getManga();
        setManga(manga);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
   
      // Simula verificação no backend se já favoritou
      // fetch(`/api/manga/${id}/favoritado`, { method: 'GET' })
      //   .then(res => res.json()).then(data => setFavoritado(data.favoritado));

      setLoading(false);
  }, [id]);

  // Função para enviar avaliação ao backend (mock)
  function handleRating(newRating) {
    setUserRating(newRating);
    // Aqui você faria a requisição real para o backend
    // Exemplo:
    // fetch(`/api/manga/${id}/avaliar`, { method: 'POST', body: JSON.stringify({ rating: newRating }) })
    //   .then(...)
    //   .catch(...)
    // Simulação de sucesso:
    alert(`Avaliação enviada: ${newRating} estrela(s)`);
  }
  // Função para favoritar manga
  function handleFavorite() {
    if (favoritado) {
      // remove favorito
      // fetch(`/api/manga/${id}/desfavoritar`, { method: 'POST' })
      //   .then(...)
      //   .catch(...)
      setManga((prev) => ({
        ...prev,
        quantidadeFavoritos: prev.quantidadeFavoritos - 1,
      }));
      setFavoritado(false);
      alert("Mangá desfavoritado com sucesso!");
      return;
    }
    // Simulação de requisição ao backend
    // fetch(`/api/manga/${id}/favoritar`, { method: 'POST' })
    //   .then(...)
    //   .catch(...)
    setManga((prev) => ({
      ...prev,
      quantidadeFavoritos: prev.quantidadeFavoritos + 1,
    }));
    setFavoritado(true);
    alert("Mangá favoritado com sucesso!");
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
                  returnMangaCap(manga.ultimoCapituloLancado);
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
                <Heart fill={favoritado ? "#8a3cff" : "white" } size={50} />
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
