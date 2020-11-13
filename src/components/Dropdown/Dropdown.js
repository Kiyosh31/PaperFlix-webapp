import React, { useState } from "react";
import "./Dropdown.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal/Modal";
import UserSettings from "components/UserSettings/UserSettings";
import ErrorModal from "components/ErrorModal/ErrorModal";

import { useHistory } from "react-router-dom";
import auth from "auth";

const Dropdown = () => {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);

  let history = useHistory();

  function userSettingsHandler() {
    setModal(!modal);
  }

  async function logoutHandler() {
    try {
      await auth.logout();
      auth.deleteCookie();
      history.push("/");
    } catch (err) {
      setError(err);
    }
  }

  function modalHandler() {
    setError(null);
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
      {error && <ErrorModal onClose={modalHandler} text={error} />}
    </div>
  );
};

export default Dropdown;
