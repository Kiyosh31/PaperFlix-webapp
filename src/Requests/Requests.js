import instance from "axios-instance";
import Cookies from "js-cookie";

class Requests {
  constructor() {
    if (Cookies.get("authenticated")) {
      this.id_user = Cookies.get("authenticated").split("|")[0];
      this.cookieValue = Cookies.get("authenticated").split("|")[1];
      this.headers = { authorization: `authenticated=${this.cookieValue}` };
      this.contentHeaders = {
        "Content-Type": "application/json",
        authorization: `authenticated=${this.cookieValue}`,
      };
    }
  }

  getAllCategories = () => {
    return new Promise((resolve, reject) => {
      instance
        .get("category-list/", {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  getLatestPapers = () => {
    return new Promise((resolve, reject) => {
      instance
        .get("paper-latest/", {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getAllPapers = () => {
    return new Promise((resolve, reject) => {
      instance
        .get("paper-list/", {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  getRandomPaper = () => {
    return new Promise((resolve, reject) => {
      instance
        .get("paper-random/", {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  searchPapers = (payload) => {
    return new Promise((resolve, reject) => {
      instance
        .post("paper-search/", payload, {
          headers: this.contentHeaders,
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

  getCategoryName = (id_category) => {
    return new Promise((resolve, reject) => {
      instance
        .get(`category-detail/${id_category}/`, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data.category);
          }
        })
        .catch((err) => reject(err));
    });
  };

  alreadyRated = (id_paper) => {
    return new Promise((resolve, reject) => {
      instance
        .get(`papersuser-detail/${this.id_user}/${id_paper}/`, {
          headers: this.headers,
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

  createRating = (id_paper, newRating) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id_user: this.id_user,
        id_paper: id_paper,
        rating: newRating,
      };

      instance
        .post("papersuser-create/", payload, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  updateRating = (id_paper, newRating) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id_user: this.id_user,
        id_paper: id_paper,
        rating: newRating,
      };

      instance
        .patch(`papersuser-update/${this.id_user}/${id_paper}/`, payload, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  updateUser = (payload) => {
    return new Promise((resolve, reject) => {
      instance
        .patch(`user-update/${this.id_user}/`, payload, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  reactivateUser = () => {
    return new Promise((resolve, reject) => {
      instance
        .patch(`user-activate/${this.id_user}/`, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };

  deactivateUser = () => {
    return new Promise((resolve, reject) => {
      instance
        .patch(`user-delete/${this.id_user}/`, {
          headers: this.contentHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err));
    });
  };
}

export default new Requests();
