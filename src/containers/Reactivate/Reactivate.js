import Background from "components/Background/Background";
import React, { Component } from "react";

import BackgroundImage from "assets/img/reactivate.jpg";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import instance from "axios-instance";

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
    },
    formIsValid: false,
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

  getUser = () => {
    instance
      .get("user-detail/<int:id_user>/")
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((err) => console.log(err));
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
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
      <div>
        <Background image={BackgroundImage}>
          <Header />
          <Box>
            <Title>Reactiva tu cuenta</Title>
            {form}
            <form onSubmit={this.submitHandler}>
              <Button btnType="submit" disabled={!this.state.formIsValid}>
                Reactivar
              </Button>
            </form>
          </Box>
        </Background>
      </div>
    );
  }
}

export default Reactivate;
