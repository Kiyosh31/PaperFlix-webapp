import React, { Component } from "react";
import "./UserSettings.css";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import CreatedContent from "components/CreatedContent/CreatedContent";

import Cookies from "js-cookie";
import instance from "axios-instance";

const initialState = {
  controls: {
    email: {
      elementType: "input",
      elementConfig: {
        type: "mail",
        placeholder: "Cambiar Correo",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: true,
      touched: false,
    },
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Cambiar nombre",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
      },
      valid: true,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Cambiar Contraseña",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
      },
      valid: true,
      touched: false,
    },
  },
  formIsValid: false,
};

class UserSettings extends Component {
  state = {
    id_user: null,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "mail",
          placeholder: "Cambiar Correo",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cambiar nombre",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: true,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cambiar Contraseña",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
    showModal: false,
  };

  componentDidMount() {
    const cookie = Cookies.get("authenticated");
    let id_user = cookie.split("/")[1];
    this.setState({ id_user: parseInt(id_user, 10) });
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

  modalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (!this.state.formIsValid) {
      console.log("Invalido");
      return;
    }

    let payload = {};
    if (this.state.controls.email.value !== "") {
      payload.email = this.state.controls.email.value;
    }
    if (this.state.controls.name.value !== "") {
      payload.name = this.state.controls.name.value;
    }
    if (this.state.controls.password.value !== "") {
      payload.password = this.state.controls.password.value;
    }

    instance
      .patch(`user-update/${this.state.id_user}/`, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("USER UPDATED SUCCESFULLY");
          this.modalHandler();
          this.clearForm();
        }
      })
      .catch((err) => console.log(err));
  };

  deactivateAccountHandler = () => {};

  clearForm = () => {
    this.setState(initialState);
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

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          clicked={this.modalHandler}
          show={this.state.showModal}
          modalClosedByBackdrop={this.modalHandler}
        >
          <CreatedContent
            title="Usuario actualizado"
            clicked={this.modalHandler}
          >
            El usuario fue actualizado con exito!
          </CreatedContent>
        </Modal>
      );
    } else {
      modal = null;
    }

    return (
      <div className="usersettings__container">
        <h1>Actualizar informacion</h1>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            btnType="submit"
            style="button__edit"
            disabled={!this.state.formIsValid}
          >
            Actualizar informacion
          </Button>
        </form>

        <Button clicked={this.deactivateAccountHandler}>
          Desactivar Cuenta
        </Button>
        {modal}
      </div>
    );
  }
}

export default UserSettings;
