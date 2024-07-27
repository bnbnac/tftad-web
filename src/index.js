import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./Router";
import { AuthProvider, useAuth } from "./tools/AuthContext";
import { setupInterceptors } from "./tools/Api";

function ApiSetup({ children }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    console.log("interceptor has been set?1");
    setupInterceptors(navigate, logout);
    console.log("interceptor has been set?2");
  }, [navigate, logout]);

  return children;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <ApiSetup />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
