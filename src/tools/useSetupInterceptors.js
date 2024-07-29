import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Api from "./Api";

const useSetupInterceptors = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await Api.post("/auth/refresh");
        console.log("Refresh token successful", response.data);
      } catch (error) {
        console.error("Refresh token request failed:", error);
        throw error;
      }
    };

    const interceptor = Api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("Interceptor hit", error);
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
          if (!originalRequest.url.includes("/auth/refresh")) {
            console.log("401 error detected");
            if (!originalRequest._retry) {
              originalRequest._retry = true;
              try {
                await refreshAccessToken();
                return Api(originalRequest);
              } catch (refreshError) {
                console.log("ref err");
                logout();
                navigate("/login");
                return Promise.reject(refreshError);
              }
            }
          } else {
            console.log("else");
            logout();
            navigate("/login");
            return Promise.reject(error);
          }
        }
        console.log("fin");
        logout();
        navigate("/login");
        return Promise.reject(error);
      }
    );

    return () => {
      Api.interceptors.response.eject(interceptor);
    };
  }, [navigate, logout]);
};

export default useSetupInterceptors;
