import instance from "axios-instance";
import Cookies from "js-cookie";

class Auth {
  login(email, password) {
    // CallBack => Logic to check in API if the user exist
    return new Promise((resolve, reject) => {
      const payload = {
        email: email,
        password: password,
      };

      this.auth = true;
      instance
        .post("user-login/", payload)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            Cookies.set(
              "authenticated",
              response.data.id_user + "|" + response.data.cookie,
              {
                expires: 5,
              }
            );
            resolve(true);
          } else if (response.status === 400) {
            reject(response);
          }
        })
        .catch((err) => reject(400));
    });
  }

  logout() {
    // CallBack => Logic Delete cookie from browser and in API
    const id_user = Cookies.get("authenticated").split("|")[0];
    const cookieValue = Cookies.get("authenticated").split("|")[1];

    instance
      .get(`user-logout/${id_user}/`, {
        headers: {
          authorization: `authenticated=${cookieValue}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("authenticated");
        }
      })
      .catch((err) => console.log(err));
  }

  isAuthenticated() {
    if (Cookies.get("authenticated")) {
      return true;
    }
    return false;
  }

  deleteCookie() {
    if (Cookies.get("authenticated")) {
      Cookies.remove("authenticated");
    }
  }
}

export default new Auth();
