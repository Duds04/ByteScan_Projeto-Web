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
  BarChart3
} from "lucide-react";
import LoadingGame from "../../components/LoadingGame";

function FavoritosPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mangasFavoritos, setMangasFavoritos] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // eslint-disable-line no-unused-vars

  useEffect(() => {
    setLoading(true);
    // Simula requisição ao servidor para buscar os favoritos
    setTimeout(() => {
      setMangasFavoritos([
        {
          id: 1,
          nome: "SPEH",
          imagemCapa: "/manga1.jpeg",
          generos: ["Terror", "Fantasia", "Mistério"],
          tipo: "Mangá",
          status: "Em lançamento",
          anoLancamento: 2025,
          autores: ["Ataide Jr"],
          artistas: ["Tarik Terceiro"],
          avaliacao: 4.5,
          progresso: 75,
          ultimoCapituloLido: 15,
          totalCapitulos: 20,
          capitulos: [
            { idCap: 15, capitulo: "Capítulo 15", data: "15/01/2025" },
            { idCap: 16, capitulo: "Capítulo 16", data: "22/01/2025" }
          ],
          dataAdicionado: "2025-01-01"
        },
        {
          id: 2,
          nome: "A Crônica do Erudito",
          imagemCapa: "/manga2.jpg",
          generos: ["Aventura", "Fantasia"],
          tipo: "Manhua",
          status: "Completo",
          anoLancamento: 2024,
          autores: ["Maria Eduarda"],
          artistas: ["João Silva"],
          avaliacao: 4.8,
          progresso: 100,
          ultimoCapituloLido: 50,
          totalCapitulos: 50,
          capitulos: [
            { idCap: 49, capitulo: "Capítulo 49", data: "10/12/2024" },
            { idCap: 50, capitulo: "Capítulo 50 - Final", data: "17/12/2024" }
          ],
          dataAdicionado: "2024-12-01"
        },
      ]);
      setLoading(false);
    }, 500);
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
      // Simula remoção do favorito
      // fetch(`/api/manga/${id}/desfavoritar`, { method: 'POST' })
      //   .then(...)
      //   .catch(...) 
      // aqui tem que alterar a quantidade de favoritos do manga
      alert("Mangá desfavoritado com sucesso!");
      setMangasFavoritos(prev => prev.filter(manga => manga.id !== mangaId));
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
          <button
            className="btn-explorar"
            onClick={() => navigate("/buscar")}
          >
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
                        <strong><Tag size={14} className="detail-icon" /> Gêneros:</strong> {manga.generos.join(", ")}
                      </div>
                      <div className="manga-info-item">
                        <strong><BookOpen size={14} className="detail-icon" /> Tipo:</strong> {manga.tipo}
                      </div>
                      <div className="manga-info-item">
                        <strong><Clock size={14} className="detail-icon" /> Status:</strong> {manga.status}
                      </div>
                      <div className="manga-info-item">
                        <strong><User size={14} className="detail-icon" /> Autor:</strong> {manga.autores.join(", ")}
                      </div>
                      <div className="manga-info-item">
                        <strong><Palette size={14} className="detail-icon" /> Artista:</strong> {manga.artistas.join(", ")}
                      </div>
                      <div className="manga-info-item">
                        <strong><BarChart3 size={14} className="detail-icon" /> Progresso:</strong> {manga.ultimoCapituloLido}/{manga.totalCapitulos} ({manga.progresso}%)
                      </div>
                    </div>

                    {/* Ações do favorito */}
                    <div className="favoritos-actions">
                      <button
                        className="btn-continuar-favorito"
                        onClick={() => {
                          if (manga.ultimoCapituloLido < manga.totalCapitulos) {
                            returnMangaCap(manga.id, manga.ultimoCapituloLido + 1);
                          } else {
                            returnMangaPage(manga.id);
                          }
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
                        <div className="release-header">Capítulos Recentes:</div>
                        {manga.capitulos.map((capitulo, idx) => (
                          <div
                            key={idx}
                            className="home-manga-card-release-item"
                          >
                            <button
                              className="release-chapter"
                              onClick={() => returnMangaCap(manga.id, capitulo.idCap)}
                            >
                              {capitulo.capitulo}
                            </button>
                            <span className="release-date">
                              {capitulo.data}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="data-adicionado">
                      Adicionado em{" "}
                      {manga.dataAdicionado
                        ? new Date(manga.dataAdicionado).toLocaleDateString("pt-BR")
                        : "Data não disponível"}
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
