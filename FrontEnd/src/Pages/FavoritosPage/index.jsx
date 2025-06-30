import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating";
import "../../styles/FavoritosPage.css";
import {
  Bookmark,
  BookOpen,
  Trash2,
  User,
  Palette,
  Tag,
  Clock,
  BarChart3,
} from "lucide-react";
import LoadingGame from "../../components/LoadingGame";
import { removeFavorito, getFavoritos } from "../../services/mangaService.js";


function FavoritosPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mangasFavoritos, setMangasFavoritos] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // eslint-disable-line no-unused-vars

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const token = localStorage.getItem("auth");

        // Buscar capítulo real
        const data = await getFavoritos(token);
        setMangasFavoritos(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar capítulo ou mangá.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const returnMangaPage = (id) => {
    navigate(`/manga/${id}`);
  };

  const returnMangaCap = (idManga, idCap) => {
    navigate(`/manga/${idManga}/cap/${idCap}`);
  };

  const handleRemoverFavorito = async (mangaId) => {
    if (
      window.confirm(
        "Tem certeza que deseja remover este mangá dos seus favoritos?"
      )
    ) {
      try {
        const token = localStorage.getItem("auth");
        await removeFavorito(token, mangaId);
        setMangasFavoritos((prev) =>
          prev.filter((manga) => manga.id !== mangaId)
        );
        alert("Mangá desfavoritado com sucesso!");
      } catch (err) {
        alert("Erro ao desfavoritar mangá!");
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingGame />;

  return (
    <div className="favoritos-page">
      <div className="favoritos-header">
        <h1 className="favoritos-title">
          <Bookmark className="favoritos-icon" />
          Meus Favoritos
        </h1>
        <p className="favoritos-subtitle">
          {mangasFavoritos.length} obra(s) na sua lista de favoritos
        </p>
      </div>

      {mangasFavoritos.length === 0 ? (
        <div className="favoritos-empty">
          <Bookmark size={64} className="empty-icon" />
          <h3>Nenhum mangá encontrado</h3>
          <p>
            {filtro === "todos"
              ? "Sua lista de favoritos está vazia. Comece adicionando mangás aos seus favoritos!"
              : `Nenhum mangá encontrado na categoria "${filtro}".`}
          </p>
          <button className="btn-explorar" onClick={() => navigate("/buscar")}>
            Explorar Mangás
          </button>
        </div>
      ) : (
        <div className="home-manga-list">
          <div className="home-manga-list-container">
            <div className="home-manga-list-items">
              {mangasFavoritos.map((manga) => (
                <div key={manga.id} className="home-manga-card">
                  <img
                    src={manga.imagemCapa}
                    alt={manga.nome}
                    className="home-manga-card-img"
                    onClick={() => returnMangaPage(manga.id)}
                  />
                  <div className="home-manga-card-info">
                    <div
                      className="home-manga-card-title"
                      onClick={() => returnMangaPage(manga.id)}
                    >
                      {manga.nome}
                    </div>

                    <div className="home-manga-card-rating">
                      <StarRating value={manga.avaliacao} />
                    </div>

                    {/* Informações adicionais do mangá */}
                    <div className="manga-details">
                      <div className="manga-info-item">
                        <strong>
                          <Tag size={14} className="detail-icon" /> Gêneros:
                        </strong>{" "}
                        {manga.genero.split(",").map((g) => g.trim())}
                      </div>
                      <div className="manga-info-item">
                        <strong>
                          <BookOpen size={14} className="detail-icon" /> Tipo:
                        </strong>{" "}
                        {manga.tipo}
                      </div>
                      <div className="manga-info-item">
                        <strong>
                          <Clock size={14} className="detail-icon" /> Status:
                        </strong>{" "}
                        {manga.status}
                      </div>
                      <div className="manga-info-item">
                        <strong>
                          <User size={14} className="detail-icon" /> Autor:
                        </strong>{" "}
                        {manga.autores.split(",").map((g) => g.trim())}
                      </div>
                      <div className="manga-info-item">
                        <strong>
                          <Palette size={14} className="detail-icon" /> Artista:
                        </strong>{" "}
                        {manga.artistas.split(",").map((g) => g.trim())}
                      </div>
                    </div>
                    {/* Ações do favorito */}
                    <div className="favoritos-actions">
                      <button
                        className="btn-continuar-favorito"
                        onClick={() => {
                          returnMangaPage(manga.id);
                        }}
                      >
                        <BookOpen size={16} />
                        {manga.progresso === 0 ? "Começar" : "Continuar"}
                      </button>

                      <button
                        className="btn-remover-favorito"
                        onClick={() => handleRemoverFavorito(manga.id)}
                        title="Remover dos favoritos"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Capítulos recentes */}
                    {manga.capitulos && manga.capitulos.length > 0 && (
                      <div className="home-manga-card-release">
                        <div className="release-header">
                          Capítulos Recentes:
                        </div>
                        {manga.capitulos.slice().reverse().slice(-3).map((capitulo, idx) => (
                          <div
                            key={idx}
                            className="home-manga-card-release-item"
                          >
                            <button
                              className="release-chapter"
                              onClick={() =>
                                returnMangaCap(manga.id, capitulo.numero)
                              }
                            >
                              {capitulo.titulo}
                            </button>
                            <span className="release-date">
                              {capitulo.data_postagem}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="data-adicionado">
                      Status da obra {" "}
                      {manga.status
                        ? `(${manga.status})`
                        : "(Desconhecido)"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FavoritosPage;
