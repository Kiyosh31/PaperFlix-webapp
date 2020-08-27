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
          console.log(response);
          if (response.status === 200) {
            let hash = sha256.create();
            hash.update(email + password);
            hash.hex();
            Cookies.set("authenticated", hash, { expires: 5 });
            resolve(true);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(false);
        });
    });
  }

  logout() {
    // CallBack => Logic Delete cookie from browser and in API
    if (this.isAuthenticated()) {
      Cookies.remove("authenticated");
    }
  }

  isAuthenticated() {
    if (Cookies.get("authenticated")) {
      return true;
    }
    return false;
  }
}

export default new Auth();
