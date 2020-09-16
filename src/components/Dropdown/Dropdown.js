import React from "react";
import "./Dropdown.css";

import { useHistory } from "react-router-dom";
import auth from "auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
  let history = useHistory();

  function settingsHandler() {
    console.log("click");
  }

  async function logoutHandler() {
    try {
      const result = await auth.logout();
      if (result) {
        console.log("logout exitoso");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dropdown">
      <ul>
        <li onClick={settingsHandler}>
          {" "}
          <FontAwesomeIcon className="dropdown__icon" icon={faCog} />
          Cuenta
        </li>
        <li onClick={logoutHandler}>
          <FontAwesomeIcon className="dropdown__icon" icon={faSignOutAlt} />
          Cerrar Sesion
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
