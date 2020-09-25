import React from "react";

import Button from "components/Button/Button";
import Title from "components/Title/Title";

import Cookies from "js-cookie";
import { sha256 } from "js-sha256";
import instance from "axios-instance";

import { useHistory } from "react-router-dom";

const Confirm = (props) => {
  let history = useHistory();

  function reactivateAccountHandler() {
    instance
      .patch(`user-activate/${props.user.id_user}/`)
      .then((response) => {
        if (response.status === 201) {
          console.log("CUENTA REACTIVADA");
          let hash = sha256.create();
          hash.update(props.user.email + props.user.password);
          hash.hex();
          Cookies.set("authenticated", hash + "/" + response.data.id_user, {
            expires: 5,
          });
          history.push("/home");
        }
      })
      .catch((err) => console.log(err));
  }

  function deactivateAccountHandler() {
    instance
      .patch(`user-delete/${props.id_user}/`)
      .then((response) => {
        if (response.status === 201) {
          Cookies.remove("authenticated");
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="confirm__container">
      <Title>{props.title}</Title>
      <p style={{ color: "white" }}>{props.children}</p>
      <Button
        clicked={
          props.reactivate ? reactivateAccountHandler : deactivateAccountHandler
        }
      >
        Confirmar
      </Button>
      <Button clicked={props.clicked} cancel noContainer>
        Cancelar
      </Button>
    </div>
  );
};

export default Confirm;
