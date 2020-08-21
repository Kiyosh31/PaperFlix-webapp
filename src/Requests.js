import instance from "axios";

const requests = {
  postUser: "http://127.0.0.1:8000/api/user-create/",
  userLogin: "http://127.0.0.1:8000/api/user-login/",
  fetchPapers: `http://127.0.0.1:8000/api/paper-list/`,
  fetchTrendings: "http://127.0.0.1:8000/api/paper-list/",
};

export default requests;
