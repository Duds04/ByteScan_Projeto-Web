import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginComponent.css";
import { Eye, EyeOff, Heart } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

function LoginComponent({ onClose }) {
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState(null);
  const [singIn, setSingIn] = useState(false);
  const { login, isLoggedIn, logout, register } = useAuth();
  const navigate = useNavigate();

  const handleGoToFavorites = () => {
    navigate("/favoritos");
    onClose(); // Fecha o modal após navegar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      senha: formData.get("password"),
    };
    const result = await login(data);

    if (result.success) {
      onClose(); // Fecha o modal se o login for bem-sucedido
    } else {
      alert("E-mail ou senha incorretos. Tente novamente.");
      // colocar um span para exibir a mensagem de erro
      setError("E-mail ou senha incorretos. Tente novamente.");
      // Limpa os campos
      e.target.password.value = "";
      e.target.email.value = "";
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("password") !== formData.get("confirm-password")) {
      alert("As senhas não coincidem. Tente novamente.");
      setError("As senhas não coincidem. Tente novamente.");
      return;
    }
    const data = {
      nome: formData.get("full-name"),
      nomeUsuario: formData.get("username"),
      email: formData.get("email"),
      senha: formData.get("password"),
    };
    const result = await register(data);
    if (result.success) {
      alert("Conta criada com sucesso!");
      setSingIn(false); // Volta para a tela de login
    } else {
      alert("Erro ao criar conta. Tente novamente.");
      // Aqui você pode definir um erro específico se necessário
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return !isLoggedIn() ? (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-center" onClick={(e) => e.stopPropagation()}>
        <div
          className={`login-container${
            singIn ? " login-container-signin" : ""
          }`}
        >
          <span
            onClick={onClose}
            aria-hidden="true"
            className="login-close-span"
          >
            ×
          </span>
          <div className="login-header">
            <h1>{singIn ? "Criar Conta" : "Bem-Vindo(a)!"}</h1>
          </div>

          <form
            onSubmit={singIn ? handleSubmitSignIn : handleSubmit}
            className="login-inputs"
          >
            {singIn && (
              <>
                <div className="login-username-container">
                  <label htmlFor="full-name" className="login-label">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    className="login-input-username"
                    placeholder="Digite seu nome completo"
                    required
                    onChange={() => setError(null)}
                  />
                </div>
                <div className="login-username-container">
                  <label htmlFor="username" className="login-label">
                    Nome de Usuário *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="login-input-username"
                    placeholder="Digite seu nome de usuário"
                    required
                    onChange={() => setError(null)}
                  />
                </div>
              </>
            )}
            <div className="login-username-container">
              <label htmlFor="login-email" className="login-label">
                E-mail *
              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                className="login-input-username"
                placeholder="Digite seu e-mail"
                required
                onChange={() => setError(null)}
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
                  onChange={() => setError(null)}
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
              {error && <span className="login-error">{error}</span>}
            </div>
            {singIn && (
              <div className="login-password-container">
                <label htmlFor="confirm-password" className="login-label">
                  Confirmar Senha *
                </label>
                <div
                  className="login-password-wrapper"
                  style={{ position: "relative" }}
                >
                  <input
                    type={viewPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirm-password"
                    className="login-input-password"
                    placeholder="Confirme sua senha"
                    onChange={() => setError(null)}
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
            )}
            {!singIn && (
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
            )}
            {!singIn && (
              <a href="" className="forgot-password">
                Esqueceu a senha?
              </a>
            )}
            <div className="login-footer">
              {!singIn ? (
                <div className="login-footer-actions-login">
                  <button
                    type="button"
                    className="singIn-btn"
                    onClick={() => setSingIn(true)}
                  >
                    Criar Conta
                  </button>
                  <button
                    onClick={onClose}
                    className="login-close-btn"
                    type="button"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <button type="submit" className="singIn-btn">
                  Cadastrar
                </button>
              )}
              {singIn && (
                <div className="login-footer-actions">
                  <button
                    type="button"
                    className="back-login-btn"
                    onClick={() => setSingIn(false)}
                  >
                    Voltar para Login
                  </button>
                  <button
                    onClick={onClose}
                    className="login-close-btn"
                    type="button"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="login-overlay">
      <div className="login-center" onClick={(e) => e.stopPropagation()}>
        <div className="login-container-isLogged">
          <span
            onClick={onClose}
            aria-hidden="true"
            className="login-close-span-isLogged"
          >
            ×
          </span>
          <h1>Você já está logado!</h1>
          <div className="logged-buttons">
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
            <button onClick={onClose} className="login-close-btn">
              Fechar
            </button>
          </div>
          <button
            onClick={handleGoToFavorites}
            className="favorites-btn"
            type="button"
          >
            <Heart size={18} />
            Meus Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
