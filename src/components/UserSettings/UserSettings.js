import React, { Component } from "react";
import "./UserSettings.css";

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import CreatedContent from "components/CreatedContent/CreatedContent";

import DeactivateConfirm from "components/DeactivateConfirm/DeactivateConfirm";
import APICalls from "APICalls/APICalls";

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
    contentType: null,
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

  modalHandler = (contentType) => {
    this.setState({
      showModal: !this.state.showModal,
      contentType: contentType,
    });
  };

  submitHandler = async (event) => {
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

    try {
      const fetchedUpdatedUser = await APICalls.updateUser(payload);
      if (fetchedUpdatedUser) {
        this.modalHandler("creado");
        this.clearForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  deactivateAccountHandler = () => {
    this.modalHandler("eliminar");
  };

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
          {this.state.contentType === "creado" ? (
            <CreatedContent
              title="Usuario actualizado"
              clicked={this.modalHandler}
            >
              El usuario fue actualizado con exito!
            </CreatedContent>
          ) : (
            <DeactivateConfirm title="Te vas tan pronto?">
              Seguro que deseas desactivar tu cuenta?
            </DeactivateConfirm>
          )}
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
          <Button btnType="submit" edit disabled={!this.state.formIsValid}>
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
