import axios from "axios";

const isDev = import.meta.env.MODE === "development";

const api = axios.create({
  baseURL: isDev ? "http://localhost:4040/api" : "/api",
  withCredentials: true,
});

export default api;
