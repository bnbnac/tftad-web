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
  const logout = async () => {
    try {
      await logoutRequest();
      setIsLoggedIn(false);
      localStorage.removeItem(LOGIN);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const logoutRequest = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WEB_SERVER}/auth/logout`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout request failed:", error);
    throw error;
  }
};

export const useAuth = () => useContext(AuthContext);
