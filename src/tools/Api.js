import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const { logout } = useAuth();

const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_SERVER,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    await axios.post("/auth/refresh", {}, { withCredentials: true });
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
};

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();

    if (error.response && error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshAccessToken();
          return Api(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }
      logout();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default Api;
