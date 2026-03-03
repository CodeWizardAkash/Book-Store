import { useState, useEffect, useContext } from "react";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
  const {isAuthenticated}= useContext(AuthContext);
  // const [openLogin, setOpenLogin] = useState(false);
  console.log("Auth:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ showLogin: true }} replace />;
  }

  return children;
}

export default ProtectedRoute;
