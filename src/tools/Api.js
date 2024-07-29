import axios from "axios";
import History from "./History";

const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_SERVER,
  withCredentials: true,
});

const refreshAccessToken = async (History) => {
  try {
    const response = await Api.post("/auth/refresh");
    console.log("Refresh token successful", response);
  } catch (error) {
    console.error("Refresh token request failed:", error);
    History.push("/login");
    window.location.reload();
  }
};

export const setupInterceptors = (History) => {
  Api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("Interceptor hit", error);
      const originalRequest = error.config;

      if (error.response && error.response.status === 401) {
        if (!originalRequest.url.includes("/auth/refresh")) {
          console.log("401 error from /auth/refresh");
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              await refreshAccessToken(History);
              return Api(originalRequest);
            } catch (error) {
              History.push("/login");
              window.location.reload();
            }
          }
        } else {
          History.push("/login");
          window.location.reload();
        }
      } else {
        throw error;
      }
    }
  );
};

export default Api;
