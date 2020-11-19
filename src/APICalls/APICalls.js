import instance from "API-instance";
import iaInstance from "IA-Instance";
import Cookies from "js-cookie";

class APICalls {
  constructor() {
    if (Cookies.get("authenticated")) {
      this.id_user = Cookies.get("authenticated").split("|")[0];
      this.cookieValue = Cookies.get("authenticated").split("|")[1];
      this.headers = { authorization: this.cookieValue };
      this.jsonHeaders = {
        "Content-Type": "application/json",
        authorization: this.cookieValue,
      };
    }
  }

  checkCookie = () => {
    if (Cookies.get("authenticated")) {
      return true;
    } else {
      return false;
    }
  };

  deleteCookie = () => {
    if (Cookies.get("authenticated")) {
      Cookies.remove("authenticated");
      window.location.reload();
    }
  };

  createHeader = () => {
    const cookieValue = Cookies.get("authenticated").split("|")[1];
    const headers = { authorization: cookieValue };
    return headers;
  };

  ///////////////////////////////////////////////// section IA /////////////////////////////////////////////////

  getMightLikePapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const payload = {
        id_user: parseInt(this.id_user),
        qty_preds: 10,
      };

      iaInstance
        .post("might_like/", payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getTopTenPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      iaInstance
        .get("top_ten/", {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getTrendingPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const payload = {
        id_user: parseInt(this.id_user),
        qty_preds: 10,
      };

      iaInstance
        .post("trending/", payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getRecommendedPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const payload = {
        id_user: parseInt(this.id_user),
        qty_preds: 20,
      };

      iaInstance
        .post("recommended/", payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  ///////////////////////////////////////////////// Finish IA section /////////////////////////////////////////////////

  getPaginatedPapers = (id_category, pageNumber) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .get(`paper-pagination/${id_category}/${pageNumber}`, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getAllCategories = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const headers = this.createHeader();

      instance
        .get("category-list/", {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getLatestPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

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
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getAllPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const headers = this.createHeader();

      instance
        .get("paper-list/", {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  getRandomPaper = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const headers = this.createHeader();

      instance
        .get("paper-random/", {
          headers: headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  searchPapers = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .post("paper-search/", payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          return;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  alreadyRated = (id_paper) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .get(`papersuser-detail/${this.id_user}/${id_paper}/`, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200 || response.status === 202) {
            resolve(response);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  createRating = (id_paper, newRating) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      const payload = {
        id_user: this.id_user,
        id_paper: id_paper,
        rating: newRating,
      };

      instance
        .post("papersuser-create/", payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  updateRating = (id_paper, newRating) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

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
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  updateUser = (payload) => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .patch(`user-update/${this.id_user}/`, payload, {
          headers: this.jsonHeaders,
        })
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  reactivateUser = (payload) => {
    return new Promise((resolve, reject) => {
      instance
        .patch("user-activate/", payload)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  deactivateUser = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

    return new Promise((resolve, reject) => {
      instance
        .delete(`user-delete/${this.id_user}/`, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.deleteCookie();
          } else {
            reject(err.response.data);
          }
        });
    });
  };

  createUser = (payload) => {
    return new Promise((resolve, reject) => {
      instance
        .post("user-create/", payload)
        .then((response) => {
          if (response.status === 201) {
            resolve(response.data);
          }
        })
        .catch((err) => reject(err.response.data));
    });
  };
}

export default new APICalls();
