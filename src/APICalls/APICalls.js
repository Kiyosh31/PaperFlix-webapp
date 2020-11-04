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
        .catch((err) => reject(err));
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
        .catch((err) => reject(err));
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
        .catch((err) => reject(err));
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
        .catch((err) => reject(err));
    });
  };

  ///////////////////////////////////////////////// section IA /////////////////////////////////////////////////

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
        .catch((err) => reject(err));
    });
  };

  getAllCategories = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

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
          reject(err);
        });
    });
  };

  getAllPapers = () => {
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

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
    if (!this.checkCookie()) {
      window.location.reload();
      return;
    }

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
        .catch((err) => reject(err));
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
          reject(err);
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
          reject(err);
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
        .catch((err) => reject(err));
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
        .catch((err) => reject(err));
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
        .catch((err) => reject(err));
    });
  };
}

export default new APICalls();
