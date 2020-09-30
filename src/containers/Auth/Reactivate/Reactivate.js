import Background from "components/Background/Background";
import React, { Component } from "react";

import BackgroundImage from "assets/img/reactivate.jpg";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import RegisterLink from "components/RegisterLink/RegisterLink";
import Input from "components/Input/Input";

import instance from "axios-instance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { sha256 } from "js-sha256";

class Reactivate extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "mail",
          placeholder: "Ingresar Correo",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Ingresar Contraseña",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    redirect: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
    }

    const payload = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };

    instance
      .patch("user-activate/", payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Reactivacion completa");
          let hash = sha256.create();
          hash.update(response.data.email + response.data.password);
          hash.hex();
          Cookies.set("authenticated", hash + "/" + response.data.id_user, {
            expires: 5,
          });
          this.setState({ redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    return (
      <Background image={BackgroundImage}>
        <Header />
        <Box>
          <Title>Reactivar cuenta</Title>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button>Reactivar</Button>
          </form>
          <RegisterLink
            question="Tu cuenta esta activa?"
            text="Inicia sesion"
            navigate="/"
          />
        </Box>
        {this.state.redirect && <Redirect to="/home" />}
      </Background>
    );
  }
}

export default Reactivate;
