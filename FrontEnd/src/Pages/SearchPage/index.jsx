import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  User, 
  Palette, 
  Search, 
  BookOpen, 
  Calendar,
  Tag,
  Star,
  Clock,
  Filter
} from "lucide-react";
import "../../styles/SearchPage.css";

// Lista de mangás simulada (pode ser importada de um arquivo ou contexto futuramente)
const ALL_MANGAS = [
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
  },
];

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  // Busca inicial e busca por gênero via state
  useEffect(() => {
    if (location.state?.genero) {
      const genero = location.state.genero;
      const filtrados = ALL_MANGAS.filter((m) => m.generos.includes(genero));
      setSearchResults(filtrados);
      setQuery(genero); // Mostra o texto do filtro no input
    } else if (location.state?.tipo) {
      const tipo = location.state.tipo;
      const filtrados = ALL_MANGAS.filter((m) => m.tipo === tipo);
      setSearchResults(filtrados);
      setQuery(tipo); // Mostra o texto do filtro no input
    } else {
      setSearchResults(ALL_MANGAS);
    }
  }, [location.state]);

  // Busca por texto
  const handleSearch = (e) => {
    e.preventDefault();
    const filtrados = ALL_MANGAS.filter(
      (m) =>
        m.nome.toLowerCase().includes(query.toLowerCase()) ||
        m.generos.some((g) => g.toLowerCase().includes(query.toLowerCase())) ||
        (m.tipo && m.tipo.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtrados);
  };

  const handleClick = (id) => {
    navigate(`/Manga/${id}`);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-page-title">
          <Search className="search-title-icon" />
          Pesquisar Mangás
        </h1>
        <p className="search-subtitle">Encontre seus mangás favoritos</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-container">
          <Search className="search-input-icon" />
          <input
            type="text"
            placeholder="Digite o nome, gênero ou tipo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn">
          <Filter size={18} />
          Pesquisar
        </button>
      </form>

      <div className="search-results-header">
        <h2 className="search-result-title">
          <BookOpen className="results-icon" />
          {searchResults.length} Resultado(s) Encontrado(s)
        </h2>
      </div>
      <hr className="search-divider" />

      <div className="search-results">
        {searchResults.map((manga) => (
          <div
            className="search-result-card"
            key={manga.id}
            onClick={() => handleClick(manga.id)}
          >
            <div className="search-card-image-container">
              <img
                src={manga.imagemCapa}
                alt={manga.nome}
                className="search-card-img"
              />
            </div>
            <div className="search-info-box">
              <div className="manga-title-section">
                <h3 className="manga-title">{manga.nome}</h3>
                <div className="rating-section">
                  <Star className="star-icon" />
                  <span>4.5</span>
                </div>
              </div>
              
              <div className="manga-details">
                <div className="detail-item">
                  <BookOpen size={16} className="detail-icon" />
                  <span className="detail-label">Tipo:</span>
                  <span className="detail-value">{manga.tipo}</span>
                </div>
                
                <div className="detail-item">
                  <Tag size={16} className="detail-icon" />
                  <span className="detail-label">Gêneros:</span>
                  <span className="detail-value">{manga.generos.join(", ")}</span>
                </div>
                
                <div className="detail-item">
                  <Clock size={16} className="detail-icon" />
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-${manga.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {manga.status}
                  </span>
                </div>
                
                <div className="detail-item">
                  <Calendar size={16} className="detail-icon" />
                  <span className="detail-label">Ano:</span>
                  <span className="detail-value">{manga.anoLancamento}</span>
                </div>
                
                <div className="detail-item">
                  <User size={16} className="detail-icon" />
                  <span className="detail-label">Autor(es):</span>
                  <span className="detail-value">{manga.autores.join(", ")}</span>
                </div>
                
                <div className="detail-item">
                  <Palette size={16} className="detail-icon" />
                  <span className="detail-label">Artista(s):</span>
                  <span className="detail-value">{manga.artistas.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
