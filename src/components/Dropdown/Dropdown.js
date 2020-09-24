import React, { useState } from "react";
import "./Dropdown.css";

import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import auth from "auth";
import Modal from "components/Modal/Modal";
import UserSettings from "components/UserSettings/UserSettings";

const Dropdown = () => {
  const [modal, setModal] = useState(false);

  let history = useHistory();

  function userSettingsHandler() {
    setModal(!modal);
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
        <li onClick={userSettingsHandler}>
          {" "}
          <FontAwesomeIcon className="dropdown__icon" icon={faCog} />
          Cuenta
        </li>
        <li onClick={logoutHandler}>
          <FontAwesomeIcon className="dropdown__icon" icon={faSignOutAlt} />
          Cerrar Sesion
        </li>
      </ul>
      {modal && (
        <Modal show={modal} modalClosedByBackdrop={userSettingsHandler}>
          <UserSettings />
        </Modal>
      )}
    </div>
  );
};

export default Dropdown;
