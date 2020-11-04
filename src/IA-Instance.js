import axios from "axios";

// Base URL to make requests to the IA
const iaInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
});

export default iaInstance;
