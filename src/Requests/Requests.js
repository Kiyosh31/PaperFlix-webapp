import instance from "axios-instance";
import Cookies from "js-cookie";

// const id_user = Cookies.get("authenticated").split("|")[0];
const cookieValue = Cookies.get("authenticated").split("|")[1];
const headers = { authorization: `authenticated=${cookieValue}` };

export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    instance
      .get("category-list/", {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const getAllPapers = () => {
  return new Promise((resolve, reject) => {
    instance
      .get("paper-list/", {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const searchPapers = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post("paper-search/", payload, {
        headers: {
          "Content-Type": "application/json",
          authorization: `authenticated=${cookieValue}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        return;
      })
      .catch((err) => reject(err));
  });
};

export const getCategoryName = (id_category) => {
  return new Promise((resolve, reject) => {
    instance
      .get(`category-detail/${id_category}/`, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.category);
        }
      })
      .catch((err) => reject(err));
  });
};
