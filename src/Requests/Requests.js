import instance from "axios-instance";
import Cookies from "js-cookie";

const id_user = Cookies.get("authenticated").split("|")[0];
const cookieValue = Cookies.get("authenticated").split("|")[1];
const headers = { authorization: `authenticated=${cookieValue}` };
const contentHeaders = {
  "Content-Type": "application/json",
  authorization: `authenticated=${cookieValue}`,
};

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

export const getRandomPaper = () => {
  return new Promise((resolve, reject) => {
    instance
      .get("paper-random/", {
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
        headers: contentHeaders,
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

export const alreadyRated = (id_paper) => {
  return new Promise((resolve, reject) => {
    instance
      .get(`papersuser-detail/${id_user}/${id_paper}/`, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.status);
        } else if (response.status === 204) {
          resolve(response.status);
        }
      })
      .catch((err) => reject(err.response));
  });
};

export const createRating = (id_paper, newRating) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id_user: id_user,
      id_paper: id_paper,
      rating: newRating,
    };

    instance
      .post("papersuser-create/", payload, {
        headers: contentHeaders,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("creado nuevo rating");
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateRating = (id_paper, newRating) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id_user: id_user,
      id_paper: id_paper,
      rating: newRating,
    };

    instance
      .patch(`papersuser-update/${id_user}/${id_paper}/`, payload, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("actualizado rating");
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
