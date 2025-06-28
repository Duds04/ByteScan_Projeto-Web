import "../../styles/HomeIntroduction.css";

function HomeIntroduction() {
  return (
    <div className="home-introduction">
      <div className="home-introduction-text">
        <h1 className="home-introduction-title">Bem-vindo ao ByteScan!</h1>
        <div className="home-introduction-description">
          <p>Explore uma vasta coleção de mangás.</p>
          <p>
            Descubra novos títulos, leia resenhas e conecte-se com outros fãs!
          </p>
          <p>
            Para começar, navegue pelo nosso catálogo ou use a barra de
            pesquisa.
          </p>
          <p>Divirta-se!</p>
          <button className="home-introduction-button">
            Se torne um administrador
          </button>
        </div>
      </div>
      <img className="home-logo" src="/logo.png" alt="Logo ByteScan" />
    </div>
  );
}

export default HomeIntroduction;
