import React, { useState } from "react";

import Button from "components/Button/Button";
import Title from "components/Title/Title";
import ErrorModal from "components/ErrorModal/ErrorModal";

import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import APICalls from "APICalls/APICalls";

const DeactivateConfirm = (props) => {
  const [error, setError] = useState(null);
  let history = useHistory();

  async function deactivateAccountHandler() {
    try {
      const fetchedDeactivate = await APICalls.deactivateUser();
      if (fetchedDeactivate) {
        Cookies.remove("authenticated");
        history.push("/");
      }
    } catch (err) {
      setError(err);
    }
  }

  function modalHandler() {
    setError(null);
  }

  return (
    <div className="confirm__container">
      <Title>{props.title}</Title>
      <p style={{ color: "white" }}>{props.children}</p>
      <Button clicked={deactivateAccountHandler}>Confirmar</Button>
      <Button clicked={props.clicked} cancel noContainer>
        Cancelar
      </Button>
      {error && <ErrorModal onClose={modalHandler} text={error} />}
    </div>
  );
};

export default DeactivateConfirm;
