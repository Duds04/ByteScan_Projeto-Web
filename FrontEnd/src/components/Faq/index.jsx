import "../../styles/Faq.css";

function Faq() {
  const developers = [
    { name: "Arthur Saraiva", email: "arthur.saraiva@ufv.br" },
    { name: "Tarik Paiva", email: "tarik.paiva@ufv.br" },
    { name: "Maria Eduarda", email: "maria.e.braga@ufv.br" }
  ];

  return (
    <div className="faq-container">
      <div className="faq-content">
        <h2 className="faq-title">FAQ - Perguntas Frequentes</h2>
        
        <div className="faq-contact-section">
          <h3 className="faq-contact-title">Contate um de nossos desenvolvedores</h3>
          
          <div className="developers-list">
            {developers.map((dev, index) => (
              <div key={index} className="developer-card">
                <h4 className="developer-name">{dev.name}</h4>
                <a 
                  href={`mailto:${dev.email}`} 
                  className="developer-email"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dev.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
