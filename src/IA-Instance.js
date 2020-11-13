import axios from "axios";

// Base URL to make requests to the IA
const iaInstance = axios.create({
  baseURL: "https://paperflix-ml.wn.r.appspot.com",
});

export default iaInstance;
