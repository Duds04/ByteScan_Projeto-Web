import "../../styles/HomeMangaList.css";
import StarRating from "../../components/StarRating";
import { useNavigate } from "react-router-dom";

function HomeMangaList({ title, mangas }) {
  const navigate = useNavigate();

  console.log("HomeMangaList props:", {
    title,
    mangas,
  });

  function returnMangaPage(id) {
    navigate(`/manga/${id}`);
  }

  function returnMangaCap(idManga, idCap) {
    navigate(`/manga/${idManga}/cap/${idCap}`);
  }
  return (
    <div className="home-manga-list">
      <div className="home-manga-list-container">
        <h2 className="home-manga-list-title">{title}</h2>
        <div className="home-manga-list-items">
          {Array.isArray(mangas) &&
            mangas.map((manga, idx) =>
              manga && manga.imagemCapa && manga.nome && manga.id ? (
                // Quando usa map tem de ter uma chave única
                <div className="home-manga-card" key={idx}>
                  <img
                    src={manga.imagemCapa}
                    alt={manga.nome}
                    className="home-manga-card-img"
                    onClick={() => {
                      returnMangaPage(manga.id);
                    }}
                  />
                  <div className="home-manga-card-info">
                    <div
                      className="home-manga-card-title"
                      onClick={() => {
                        returnMangaPage(manga.id);
                      }}
                    >
                      {manga.nome}
                    </div>
                    <div className="home-manga-card-rating">
                      <StarRating value={manga.avaliacao} />
                    </div>
                    {manga.capitulos && manga.capitulos.length > 0 && (
                      <div className="home-manga-card-release">
                        {manga.capitulos.map((capitulos, lidx) => (
                          <div
                            key={lidx}
                            className="home-manga-card-release-item"
                          >
                            <button
                              className="release-chapter"
                              onClick={() => {
                                returnMangaCap(manga.id, capitulos.idCap);
                              }}
                            >
                              {capitulos.capitulo}
                            </button>
                            <span className="release-date">
                              {capitulos.data}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}

export default HomeMangaList;
