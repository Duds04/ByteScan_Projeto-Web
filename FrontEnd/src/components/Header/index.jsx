import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const [hiding, setHiding] = useState(false);

  // Lista de gêneros e tipos
  const generos = [
    "Ação",
    "Aventura",
    "Comédia",
    "Drama",
    "Fantasia",
    "Romance",
    "Slice of Life",
    "Terror",
  ];
  const tipos = ["Mangá", "Manhwa", "Manhua", "Webtoon"];

  const handleDropdownClose = () => {
    setHiding(true);
    setTimeout(() => {
      setOpen(false);
      setHiding(false);
    }, 100); // tempo igual ao transition do CSS
  };

  return (
    <div className="header">
      <img className="header-logo" src="/logo.png" alt="Logo ByteScan" />
      <div className="header-nav">
        <Link to="/">Home</Link>
        <a
          href="https://discord.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
        <div
          className={`header-nav-dropdown-wrapper${open ? " --open" : ""}`}
        >
          <button
            className="header-nav-manga"
            onClick={() => (open ? handleDropdownClose() : setOpen(true))}
          >
            Mangás{" "}
            {open ? (
              <ChevronUp className="header-nav-chevron" />
            ) : (
              <ChevronDown className="header-nav-chevron" />
            )}
          </button>
          {open && (
            <div
              className={`dropdown-menu${hiding ? " hide" : ""}`}
              onMouseLeave={handleDropdownClose}
            >
              <div className="dropdown-section">
                <span className="dropdown-title">Gêneros</span>
                <ul>
                  {generos.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
              <div className="dropdown-section">
                <span className="dropdown-title">Tipos</span>
                <ul>
                  {tipos.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <Link to="/faq">FAQ</Link>
      </div>
      <button className="header-button">Entre</button>
    </div>
  );
}

export default Header;
