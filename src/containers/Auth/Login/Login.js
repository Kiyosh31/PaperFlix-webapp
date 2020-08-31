import React, { Component } from "react";

import Background from "components/Background/Background";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import Link from "components/RegisterLink/RegisterLink";
import BackgroundImage from "assets/img/login.jpg";

import auth from "auth";
import { Redirect } from "react-router-dom";

// import instance from "axios-instance";

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "mail",
          placeholder: "Enter Email",
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
          placeholder: "Enter Password",
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
    isAuthenticated: false,
  };

  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.setState({ isAuthenticated: true });
    }
  }

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

  submitHandler = async (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("No es valido");
      return;
    }

    try {
      await auth.login(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
      this.setState({ isAuthenticated: true });
    } catch (err) {
      console.log(err);
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
          <Title>Sign in</Title>
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="submit" disabled={!this.state.formIsValid}>
              Sign In
            </Button>
            <CheckBox text="Remember me" />
          </form>
          <Link
            question="New in Paperflix?"
            text="Register"
            navigate="/register"
          />
        </Box>
        {this.state.isAuthenticated && <Redirect to="/home" />}
      </Background>
    );
  }
}

export default Login;
