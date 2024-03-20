import React, { createContext, useState, useContext } from "react";

const LOGIN = "login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem(LOGIN))
  );

  const login = () => {
    localStorage.setItem(LOGIN, true);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(LOGIN);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
