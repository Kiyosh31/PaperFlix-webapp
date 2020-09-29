import instance from "axios-instance";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

class Auth {
  constructor() {
    this.auth = false;
  }

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
          if (response.status === 200) {
            let hash = sha256.create();
            hash.update(email + password);
            hash.hex();
            Cookies.set("authenticated", hash + "/" + response.data.id_user, {
              expires: 5,
            });
            resolve(true);
          } else if (response.status === 201) {
            // console.log("id_user", response.data);
            reject(response);
          }
        })
        .catch((err) => reject(err));
    });
  }

  logout() {
    // CallBack => Logic Delete cookie from browser and in API
    return new Promise((resolve, reject) => {
      Cookies.remove("authenticated");
      if (!this.isAuthenticated()) {
        resolve(true);
      }
      reject(false);
    });
  }

  isAuthenticated() {
    if (Cookies.get("authenticated")) {
      return true;
    }
    return false;
  }
}

export default new Auth();
