import instance from "API-instance";
import Cookies from "js-cookie";

class Auth {
  async login(email, password) {
    // CallBack => Logic to check in API if the user exist
    return new Promise((resolve, reject) => {
      const payload = {
        email: email,
        password: password,
      };

      instance
        .post("user-login/", payload)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            Cookies.set(
              "authenticated",
              response.data.id_user + "|" + response.data.cookie
            );
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  async logout() {
    // CallBack => Logic Delete cookie from browser and in API
    const id_user = Cookies.get("authenticated").split("|")[0];
    const cookieValue = Cookies.get("authenticated").split("|")[1];

    return new Promise((resolve, reject) => {
      instance
        .get(`user-logout/${id_user}/`, {
          headers: {
            authorization: cookieValue,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Cookies.remove("authenticated");
            resolve(true);
          }
        })
        .catch((err) => reject(err.response.data));
    });
  }

  isAuthenticated() {
    if (Cookies.get("authenticated")) {
      return true;
    } else {
      return false;
    }
  }

  deleteCookie() {
    if (Cookies.get("authenticated")) {
      Cookies.remove("authenticated");
    }
  }
}

export default new Auth();
