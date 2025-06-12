import { useState } from "react";
import "../../styles/LoginComponent.css";
import { Eye, EyeOff } from "lucide-react";

function LoginComponent({ onClose }) {
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      saveLogin: formData.get("save-login") === "on",
    };
    // Exemplo de POST usando fetch
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // Resultado do login aqui
        console.log(result);
      })
      .catch((err) => {
        // Tratando erros..
        console.error(err);
      });
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-center" onClick={(e) => e.stopPropagation()}>
        <div className="login-container">
            <span
              onClick={onClose}
              aria-hidden="true"
              className="login-close-span"
            >
              ×
            </span>
          <div className="login-header">
            <h1>Bem-Vindo(a)!</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="login-inputs">
            <div className="login-username-container">
              <label htmlFor="login-username" className="login-label">
                Usuário ou Email *
              </label>
              <input
                type="text"
                id="login-username"
                name="username"
                className="login-input-username"
                placeholder="Digite seu usuário ou email"
                required
              />
            </div>
            <div className="login-password-container">
              <label htmlFor="password" className="login-label">
                Senha *
              </label>
              <div
                className="login-password-wrapper"
                style={{ position: "relative" }}
              >
                <input
                  type={viewPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="login-input-password"
                  placeholder="Digite sua senha"
                  required
                  style={{ paddingRight: "2.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setViewPassword((prevState) => !prevState)}
                  className="password-toggle-btn"
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  {viewPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            <div className="submit-container">
              <button type="submit" className="submit-btn">
                Entre
              </button>
              <div className="save-login-container">
                <input type="checkbox" name="save-login" id="save-login" />
                <label htmlFor="save-login" className="save-label">
                  Lembre-me
                </label>
              </div>
            </div>
            <a href="" className="forgot-password">
              Esqueceu a senha?
            </a>
          </form>
          <button onClick={onClose} className="login-close-btn">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
