import axios from "axios";

// Base URL to make requests to the api
const instance = axios.create({
  baseURL: "https://paperflix-api.ue.r.appspot.com/api/",
});

export default instance;
