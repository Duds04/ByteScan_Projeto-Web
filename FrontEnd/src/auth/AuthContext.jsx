import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, registerAPI, decodeJWT } from "./apiLogin";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const decoded = decodeJWT(stored);
      setUser(decoded.user_id);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // Exemplo de uso:
      const data = await loginAPI(credentials);
      console.log('data  ', data);

      const decoded = decodeJWT(data.token);
      setUserId(decoded.user_id);
      setUser(decoded.username);

      localStorage.setItem("auth", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(decoded.username));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (newUser) => {
    try {
      const data = await registerAPI(newUser);
      console.log("data ", data);

      setUser(data.user);

      localStorage.setItem("auth", JSON.stringify(data.token));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  const isLoggedIn = () => {
    const stored = localStorage.getItem("auth");
    return stored !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
