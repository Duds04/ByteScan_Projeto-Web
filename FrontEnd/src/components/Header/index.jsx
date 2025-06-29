import {
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Home,
  MessageCircle,
  BookOpen,
  Search,
  Heart,
  HelpCircle,
  LogIn,
  Tag,
  Library
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";

import LoginComponent from "../LoginComponent";

export const getGeneros = async () => {
  const response = await fetch("http://localhost:5000/api/manga/generos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return await response.json();
};

export const getTipos = async () => {
  const response = await fetch("http://localhost:5000/api/manga/categorias", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return await response.json();
};


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [generos, setGeneros ] = useState([]); 
  const [tipos, setTipos ] = useState([]); 
  const { user, isLoggedIn } = useAuth();

  const handleDropdownClose = () => {
    setHiding(true);
    setTimeout(() => {
      setOpen(false);
      setHiding(false);
    }, 100); // tempo igual ao transition do CSS
  };

  // Abre o modal de login automaticamente se vier do PrivateRoute
  useEffect(() => {
    async function fetchData() {
      try {
        const g = await getGeneros();
        const t = await getTipos();
        setGeneros(g);
        setTipos(t);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
    if (location.state?.openLogin) {
      setLogin(true);
      // Limpa o state para evitar reabrir ao navegar
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
      </style>
      {login && <LoginComponent onClose={() => setLogin(false)} />}
      <div className="header">
        <img className="header-logo" src="/logo.png" alt="Logo ByteScan" />
        <div className="header-nav">
          <Link to="/" className="nav-link">
            <Home size={18} />
            Home
          </Link>
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <MessageCircle size={18} />
            Discord
          </a>
          <div
            className={`header-nav-dropdown-wrapper${open ? " --open" : ""}`}
          >
            <button
              className="header-nav-manga"
              onClick={() => (open ? handleDropdownClose() : setOpen(true))}
            >
              <span className="mangas"><BookOpen size={18} /> Mangás</span>
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
                  <span className="dropdown-title">
                    <Tag size={16} />
                    Gêneros
                  </span>
                  <ul>
                    {generos.map((g, i) => (
                      <li key={i} onClick={() => {
                        navigate('/buscar', { state: { genero: g } });
                        setOpen(false);
                      }}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown-section">
                  <span className="dropdown-title">
                    <Library size={16} />
                    Tipos
                  </span>
                  <ul>
                    {tipos.map((t, i) => (
                      <li key={i} onClick={() => {
                        navigate('/buscar', { state: { tipo: t } });
                        setOpen(false);
                      }}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link to="/buscar" className="nav-link">
            <Search size={18} />
            Pesquisar
          </Link>
          <Link to="/favoritos" className="nav-link">
            <Heart size={18} />
            Favoritos
          </Link>
          <Link to="/faq" className="nav-link">
            <HelpCircle size={18} />
            FAQ
          </Link>

        </div>
        {/* {isLoggedIn ? (): () } */}
        {isLoggedIn() && (
          <div
            className="header-user-info"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => setLogin(true)}
          >
            <span className="custom-avatar">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                src="/avatar.svg"
              >
                <circle cx="24" cy="24" r="22" fill="#F9DFFF" />
                <ellipse cx="24" cy="20" rx="8" ry="9" fill="#3B1D8F" />
                <ellipse cx="24" cy="36" rx="13" ry="7" fill="#3B1D8F" />
              </svg>
            </span>
            <span className="header-username">
              {user?.nomeUsuario || "Usuário"}
            </span>
          </div>
        )}
        {!isLoggedIn() && (
          <button
            className="header-button"
            onClick={() => {
              setLogin(true);
            }}
          >
            <LogIn size={18} />
            Entre
          </button>
        )}
      </div>
    </>
  );
}

export default Header;
