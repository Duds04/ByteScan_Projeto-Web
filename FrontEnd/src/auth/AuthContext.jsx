import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, registerAPI } from "./apiLogin";

// Criando o contexto que ira armazenar as informações de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Armazena o usuário logado. Inicialmente, null significa que ninguém está logado.
  const [user, setUser] = useState(null);

  // Verifica se o usuário está logado ao iniciar a aplicação (olha se tem algo no localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    // se tiver algo no localStorage, faz o login automático
    if (stored) {
      // Converte os dados para o formato de JSON
      const data = JSON.parse(stored);
      // Salva as informações do  no sistema
      setUser(data.user);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // Faz a requisição pro back de login
      const data = await loginAPI(credentials);
      // Salva as informações do usuário
      setUser(data.user);
      // Salva o token no localStorage
      localStorage.setItem("auth", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (newUser) => {
    try {
      // faz uma requisição pro back pra registrar um novo usuario
      const data = await registerAPI(newUser);

      // Salva as informações do usuário no sistema
      setUser(data.user);

      //salva token no local storage
      localStorage.setItem("auth", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    // Limpa informações de login do sistema
    setUser(null);
    localStorage.removeItem("auth");
  };

  const isLoggedIn = () => {
    // Verifica se o usuário está logado
    const stored = localStorage.getItem("auth");
    return stored !== null;
  };

  // Disponibiliza as funções e dados do usuário para qualquer componente filho de AuthContext 2
  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
