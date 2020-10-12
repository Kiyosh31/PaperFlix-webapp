import React from "react";

import Button from "components/Button/Button";
import Title from "components/Title/Title";

import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import Requests from "Requests/Requests";

const DeactivateConfirm = (props) => {
  let history = useHistory();

  async function deactivateAccountHandler() {
    try {
      const fetchedDeactivate = await Requests.deactivateUser();
      if (fetchedDeactivate) {
        Cookies.remove("authenticated");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
    // instance
    //   .patch(`user-delete/${props.id_user}/`)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       Cookies.remove("authenticated");
    //       history.push("/");
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <div className="confirm__container">
      <Title>{props.title}</Title>
      <p style={{ color: "white" }}>{props.children}</p>
      <Button clicked={deactivateAccountHandler}>Confirmar</Button>
      <Button clicked={props.clicked} cancel noContainer>
        Cancelar
      </Button>
    </div>
  );
};

export default DeactivateConfirm;
