import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../styles/ChapterPage.css";
import { useEffect, useState } from "react";
import LoadingGame from "../LoadingGame";
import { ArrowLeft, ArrowRight, InfoIcon, Bookmark } from "lucide-react";
import ScrollToTopButton from "../ScrollToTopButton";

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
    navigate(`/Manga/${id}`);
  }
  function returnPrevCap() {
    if (idCap == 0) {
      alert("Você já está no primeiro capítulo!");
      return;
    }
    navigate(`/Manga/${id}/Cap/${parseInt(idCap) - 1}`);
  }

  function returnNextCap() {
    if (parseInt(idCap) == parseInt(manga.idUltimoCapituloLancado)) {
      alert("Você já está no último capítulo!");
      return;
    }
    navigate(`/Manga/${id}/Cap/${parseInt(idCap) + 1}`);
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
        ...mockCapitulo,
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
      setLoading(false);
    }, 400);
  }, [id, idCap]); // Toda vez que os param das rotas mudarem chama o useEffect

  function ControlerCapitulo() {
    return (
      <div className="chapter-controler">
        <select
          value={capitulo.idCap}
          onChange={(e) => navigate(`/Manga/${id}/Cap/${e.target.value}`)}
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
            {" "}
            <ArrowLeft /> Anterior{" "}
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
            {" "}
            Próximo <ArrowRight />
          </button>
          <button
            className="chapter-button"
            onClick={() => {
              returnMangaPage();
            }}
          >
            <InfoIcon />
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
        <span>
          <a href="">Home</a> / <a href="">{manga.nome}</a> /{" "}
          <a href="">{capitulo.capitulo}</a>
        </span>
        <button
          className={favoritado ? "chapter-bookmark-btn-ativado" : "chapter-bookmark-btn"}
          onClick={() => setFavoritado((f) => !f)}
          aria-label={favoritado ? "Desfavoritar" : "Favoritar"}
        >
          <Bookmark
            color={favoritado ? "#a251fe" : "#252562"}
            fill={favoritado ? "#a251fe" : "#252562"}
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
