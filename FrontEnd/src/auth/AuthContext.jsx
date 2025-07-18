import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, registerAPI, decodeJWT } from "./apiLogin";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored != undefined) {
      const decoded = decodeJWT(stored);
      setUser(decoded.username);
      setUserId(decoded.user_id);
    }

  }, [user, userId]);

  const login = async (credentials) => {
    try {
      const data = await loginAPI(credentials);
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
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/");
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
