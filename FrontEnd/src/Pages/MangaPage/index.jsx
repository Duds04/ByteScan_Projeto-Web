import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "../../components/StarRating";
import "../../styles/MangaPage.css";
import { Bookmark } from "lucide-react";
import LoadingGame from "../../components/LoadingGame";



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
    setTimeout(() => {
      // Mock de dados retornados do servidor
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
      // Simula verificação no backend se já favoritou
      // fetch(`/api/manga/${id}/favoritado`, { method: 'GET' })
      //   .then(res => res.json()).then(data => setFavoritado(data.favoritado));

      setLoading(false);
    }, 500); // Simula 5 segundos de carregamento
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
      alert("Você já favoritou este mangá!");
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
    navigate(`/Manga/${id}/Cap/${idCap}`, {
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
          <p>
            <b>Avaliação</b>
            <StarRating
              value={userRating !== null ? userRating : manga.avaliacao}
              onChange={handleRating}
              interactive={true}
            />
          </p>
          <p>
            <b>Gênero(s):</b> {manga.generos.join(", ")}
          </p>
          <p>
            <b>Tipo:</b> {manga.tipo}
          </p>
          <p>
            <b>Status:</b> {manga.status}
          </p>
          <p>
            <b>Ano de Lançamento:</b> {manga.anoLancamento}
          </p>
          <p>
            <b>Autor(es):</b> {manga.autores.join(", ")}
          </p>
          <p>
            <b>Artista(s):</b> {manga.artistas.join(", ")}
          </p>
          <div className="nav-chapters">
            <div className="button-chapters-container">
              <button
                className="button-chapters"
                onClick={() => {
                  returnMangaCap(1);
                }}
              >
                Primeiro Capitulo
              </button>
              <button
                className="button-chapters"
                onClick={() => {
                  returnMangaCap(manga.ultimoCapituloLancado);
                }}
              >
                Último Capitulo
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
                disabled={favoritado}
                style={
                  favoritado ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
              >
                <Bookmark fill="white" size={50} />
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
        <h2 className="manga-chapter-title">Capítulos</h2>
        <div className="manga-chapters-list">
          {manga.capitulos.map((cap) => (
            <button
              key={cap.idCap}
              className="manga-chapters-item"
              onClick={() => {
                returnMangaCap(cap.idCap);
              }}
            >
              <span className="chapters-titulo">{cap.capitulo}</span>
              <span className="chapters-data">{cap.data}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaPage;
