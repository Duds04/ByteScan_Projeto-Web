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
  Filter,
} from "lucide-react";
import LoadingGame from "../../components/LoadingGame";
import "../../styles/SearchPage.css";
import {
  getObras,
  filtrarObrasCategoria,
  filtrarObrasGenero,
  pesquisarObras,
  getCategorias,
  getGeneros,
} from "../../services/mangaService.js";

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
  const [loading, setLoading] = useState(true);
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Carregar gêneros e tipos disponíveis
  useEffect(() => {
    async function fetchFilters() {
      try {
        const [generosData, tiposData] = await Promise.all([
          getGeneros(),
          getCategorias()
        ]);
        setGeneros(generosData);
        setTipos(tiposData);
      } catch (error) {
        console.error("Erro ao carregar filtros:", error);
      }
    }
    fetchFilters();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        let data;
        if (location.state?.genero) {
          const genero = location.state.genero;
          data = await filtrarObrasGenero(genero);
          setFiltroGenero(genero);
        } else if (location.state?.tipo) {
          const tipo = location.state.tipo;
          data = await filtrarObrasCategoria(tipo);
          setFiltroTipo(tipo);
        } else {
          data = await getObras();
        }
        setSearchResults(data || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location.state]);

  // Busca por texto
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.querySelector("input").value;

    setLoading(true);
    try {
      if (!searchTerm.trim()) {
        const data = await getObras();
        setSearchResults(data || []);
      } else {
        const data = await pesquisarObras(searchTerm);
        setSearchResults(data || []);
      }
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para aplicar filtros
  const aplicarFiltros = async () => {
    setLoading(true);
    try {
      let data;
      if (filtroGenero && filtroTipo) {
        // Se ambos estão selecionados, buscar todos e filtrar localmente
        const allData = await getObras();
        data = allData.filter(manga => 
          manga.genero.toLowerCase().includes(filtroGenero.toLowerCase()) &&
          manga.tipo.toLowerCase().includes(filtroTipo.toLowerCase())
        );
      } else if (filtroGenero) {
        data = await filtrarObrasGenero(filtroGenero);
      } else if (filtroTipo) {
        data = await filtrarObrasCategoria(filtroTipo);
      } else {
        data = await getObras();
      }
      setSearchResults(data || []);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para limpar filtros
  const limparFiltros = async () => {
    setFiltroGenero("");
    setFiltroTipo("");
    setQuery("");
    setLoading(true);
    try {
      const data = await getObras();
      setSearchResults(data || []);
    } catch (error) {
      console.error("Erro ao limpar filtros:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/manga/${id}`);
  };

  if (loading) return <LoadingGame />;
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
            placeholder="Digite o Nome da Obra..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn">
          <Filter size={18} />
          Pesquisar
        </button>
      </form>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">
            <Tag size={16} />
            Gênero:
          </label>
          <select
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os gêneros</option>
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <BookOpen size={16} />
            Tipo:
          </label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            onClick={aplicarFiltros}
            className="btn-apply-filter"
          >
            <Filter size={16} />
            Aplicar Filtros
          </button>
          <button
            type="button"
            onClick={limparFiltros}
            className="btn-clear-filter"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="search-results-header">
        <h2 className="search-result-title">
          <BookOpen className="results-icon" />
          {searchResults?.length || 0} Resultado(s) Encontrado(s)
        </h2>
      </div>
      <hr className="search-divider" />

      <div className="search-results">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((manga) => (
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
                    <span className="detail-value">
                      {manga.genero.split(",").map((g) => g.trim())}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Clock size={16} className="detail-icon" />
                    <span className="detail-label">Status:</span>
                    <span
                      className={`detail-value status-${manga.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
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
                    <span className="detail-value">
                      {manga.autores.split(",").map((g) => g.trim())}
                    </span>
                  </div>

                  <div className="detail-item">
                    <Palette size={16} className="detail-icon" />
                    <span className="detail-label">Artista(s):</span>
                    <span className="detail-value">
                      {manga.artistas.split(",").map((g) => g.trim())}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
