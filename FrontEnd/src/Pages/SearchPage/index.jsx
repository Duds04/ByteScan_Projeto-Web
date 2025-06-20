import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
  // ...adicione mais mangás conforme necessário
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
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite sua pesquisa!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      <h2 className="search-result-title">
        {searchResults.length} Resultado(s)
      </h2>
      <hr className="search-divider" />

      <div className="search-results">
        {searchResults.map((manga) => (
          <div
            className="search-result-card"
            key={manga.id}
            onClick={() => handleClick(manga.id)}
          >
            <img
              src={manga.imagemCapa}
              alt={manga.nome}
              className="search-card-img"
            />
            <div className="search-info-box">
              <p>
                <b>Nome:</b> {manga.nome}
              </p>
              <p>
                <b>Tipo:</b> {manga.tipo}
              </p>
              <p>
                <b>Gênero:</b> {manga.generos.join(", ")}
              </p>
              <p>
                <b>Status:</b> {manga.status}
              </p>
              <p>
                <b>Ano Lançamento:</b> {manga.anoLancamento}
              </p>
              <p>
                <b>Autore(s):</b> {manga.autores.join(", ")}
              </p>
              <p>
                <b>Artista(s):</b> {manga.artistas.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
