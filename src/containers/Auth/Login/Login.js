import React, { Component } from "react";
import axios from "axios";

import Background from "components/Background/Background";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import Link from "components/RegisterLink/RegisterLink";
import requests from "Requests";

import BackgroundImage from "assets/img/login.jpg";

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
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
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
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const payload = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };

    axios
      .post(requests.userLogin, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("LOGIN SUCCESSFULLY");
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
          <Title title="Sing In" />
          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="submit">Sign In</Button>
            <CheckBox text="Remember me" />
          </form>
          <Link
            question="New in Paperflix?"
            text="Register"
            navigate="/register"
          />
        </Box>
      </Background>
    );
  }
}

export default Login;
