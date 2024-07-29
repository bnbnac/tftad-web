import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_WEB_SERVER,
  withCredentials: true,
});

export default Api;
