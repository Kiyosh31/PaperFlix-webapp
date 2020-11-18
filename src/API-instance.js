import axios from "axios";

// Base URL to make requests to the api
const instance = axios.create({
  // baseURL: "https://paperflix-api.ue.r.appspot.com/api/",
  baseURL: "http://127.0.0.1:8000/api/",
});

export default instance;
