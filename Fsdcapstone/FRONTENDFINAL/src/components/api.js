import axios from "axios";

// Configure base URLs for your two services:
export const authApi = axios.create({
  baseURL: "http://localhost:8084/users", // user authentication service
});

export const kanbanApi = axios.create({
  baseURL: "http://localhost:8089/api", // Kanban backend service
});

// Optionally, add an interceptor to attach the JWT token to requests
kanbanApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
