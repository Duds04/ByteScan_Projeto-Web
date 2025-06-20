import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Se tiver logado, renderiza o componente filho, senão redireciona para a página inicial e abre o login
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    //replace para não manter o histórico de navegação   
    <Navigate to="/" state={{ openLogin: true }} replace />
  );
};

export default PrivateRoute;
