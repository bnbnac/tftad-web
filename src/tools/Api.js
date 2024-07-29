import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_SERVER,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await Api.post("/auth/refresh");
    console.log("Refresh token successful", response.data);
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
};

export const setupInterceptors = (navigate, logout) => {
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("Interceptor hit", error);
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest.url.includes("/auth/refresh")
      ) {
        console.log("401 error detected");
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshAccessToken();
            return Api(originalRequest);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            logout();
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
};

setupInterceptors();
export default Api;
