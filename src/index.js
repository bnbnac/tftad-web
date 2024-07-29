import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import router from "./Router";
import { AuthProvider } from "./tools/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <HistoryRouter>
        <RouterProvider router={router}></RouterProvider>
      </HistoryRouter>
    </AuthProvider>
  </React.StrictMode>
);
