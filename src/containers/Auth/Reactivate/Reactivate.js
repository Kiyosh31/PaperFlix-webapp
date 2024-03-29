import Background from "components/Background/Background";
import React, { Component } from "react";

import BackgroundImage from "assets/img/reactivate.jpg";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import RegisterLink from "components/RegisterLink/RegisterLink";
import Input from "components/Input/Input";
import ErrorModal from "components/ErrorModal/ErrorModal";

import { Redirect } from "react-router-dom";
import APICalls from "APICalls/APICalls";

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
    error: null,
    isLoading: false,
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

  modalHandler = () => {
    this.setState({ error: null });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (!this.state.formIsValid) {
      this.setState({ error: ["El formulario no es valido."] });
      return;
    }

    const payload = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };

    try {
      const fetchedReactivate = await APICalls.reactivateUser(payload);
      if (fetchedReactivate) {
        this.setState({ isLoading: false, redirect: true });
      }
    } catch (err) {
      this.setState({ isLoading: false, error: err });
    }
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
        {this.state.error && (
          <ErrorModal onClose={this.modalHandler} text={this.state.error} />
        )}
      </Background>
    );
  }
}

export default Reactivate;
