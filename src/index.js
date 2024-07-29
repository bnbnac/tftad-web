import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { AuthProvider } from "./tools/AuthContext";
import { setupInterceptors } from "./tools/Api";
import History from "./tools/History";

const root = ReactDOM.createRoot(document.getElementById("root"));
setupInterceptors(History);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
