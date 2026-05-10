import axios from "axios";

const ORCHESTRATOR_URL = "http://192.168.1.10:8080";

// Frontend only talks to the Orchestrator Service in this SOA flow.
const api = axios.create({
  baseURL: ORCHESTRATOR_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (data) => api.post("/login", data);
export const getTours = () => api.get("/tours");
export const getTourById = (id) => api.get(`/tours/${id}`);
export const bookTour = (data) => api.post("/book-tour", data);

export default api;
